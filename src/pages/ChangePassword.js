import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    /* coloquei espaço no http para nao trocar esta anotação
     local: h ttp://localhost:3001/   
    server: h ttps://fullstackreact-posts-server.onrender.com/
    server:h ttps://fullstackreact-posts-server.onrender.com
    */

    const changePassword = () => {
        axios
            .put(
                "https://fullstackreact-posts-server.onrender.com/auth/changepassword",
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    alert("Password has been changed!")
                    navigate("/");
                }
            });
    };

    return (
        <div>
            <h1>Change Your Password</h1>
            <input
                type="text"
                placeholder="Old Password..."
                onChange={(event) => {
                    setOldPassword(event.target.value);
                }}
            />
            <input
                type="text"
                placeholder="New Password..."
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}
            />
            <button onClick={changePassword}> Save Changes</button>
        </div>
    );
}

export default ChangePassword;
