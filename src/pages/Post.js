import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        /*
        let t = `https://fullstackreact-posts-server.onrender.com/posts/byId/${id}`;
        console.log("Post.js client passei" + t);
        */
        axios.get(`https://fullstackreact-posts-server.onrender.com/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`https://fullstackreact-posts-server.onrender.com/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []); //UseEffect se deixar sem o array [] vai ficar rodando sem fim

    const addComment = () => {
        axios
            .post(
                "https://fullstackreact-posts-server.onrender.com/comments",
                {
                    commentBody: newComment,
                    PostId: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = {
                        commentBody: newComment,
                        username: response.data.username,
                    };
                    setComments([...comments, commentToAdd]);
                    setNewComment(""); //limpa o campo de comentário após enviar ao banco
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`https://fullstackreact-posts-server.onrender.com/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                //alert(response.data);
                if (response.data == "DELETED SUCCESSFULLY") {
                    alert("--- DELETED SUCCESSFULLY ---");
                } else { alert("!!! DELETED UNSUCCESSFULLY !!!---") }

                setComments(
                    comments.filter((val) => {
                        return val.id != id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`https://fullstackreact-posts-server.onrender.com/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                alert("Post Deleted successfuly!")
                navigate("/");
            });
    };

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title:")
            axios.put("https://fullstackreact-posts-server.onrender.com/posts/title",
                {
                    newTitle: newTitle,
                    id: id,
                },
                {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                }
            );
            setPostObject({ ...postObject, title: newTitle });
        } else {
            let newPostText = prompt("Enter New Text:");
            axios.put("https://fullstackreact-posts-server.onrender.com/posts/postText",
                {
                    newText: newPostText,
                    id: id,
                },
                {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                }
            );
            setPostObject({ ...postObject, postText: newPostText });
        }
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("title")
                            }
                        }}
                    >
                        {postObject.title}
                    </div>
                    <div className="body"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("body")
                            }
                        }}
                    >
                        {postObject.postText}
                    </div>
                    <div className="footer">
                        {postObject.username}
                        {authState.username === postObject.username && (
                            <button
                                onClick={() => {
                                    deletePost(postObject.id);
                                }}
                            >
                                {" "}
                                Delete Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment} //valor inicial do campo
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                {comment.commentBody}
                                <label> Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;