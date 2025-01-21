import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // This line is crucial
    const { setAuthState } = useContext(AuthContext);

    //console.log(response.data);
    const login = () => {
        const data = { username: username, password: password };
        axios.post("https://fullstackreact-posts-server.netlify.app/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error); //response msg vem do server/routes/user.js 
            } else {
                alert("client/src/pages/login - Cool")
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
                //navigage("/");
                navigate('/') //feito o login vai para a pág inicial
            }
        });
    };

    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input
                type="text"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login </button>
        </div>
    );
}

export default Login;