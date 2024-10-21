import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../utilities/Server";
import { setToken } from "../utilities/Slice";
import './Login.scss';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await loginUser(email, password); 
            const token = response.token; 
            localStorage.setItem('token', token);

            dispatch(setToken(token));
            navigate("/user"); 
        } 
        catch (error) {
            console.log(error.response.data); 
            setMessage("L'authentification a échouée");
        }
    };

    return (
        <div className="login">

                <div className="header_login">
                    <form className="header_login-form" id="loginForm" onSubmit={handleSubmit}>
                        <h1>Se connecter</h1>
                        <div className="header_login-form--fieldset">
                            <fieldset>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                            </fieldset>
                            <fieldset id="error-message" className="error-message">
                                {message ? <p>{message}</p> : null}
                            </fieldset>       
                        </div>
                        <div className="header_login-form--bouton">
                            <button className="bouton bouton_invertNoir" type="submit">Se connecter</button>
                        </div>  
                    </form>
                </div>
            
        </div>
    )
}

export default Login;