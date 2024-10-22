import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utilities/Server";
import Logo from "../img/logo.svg";

import './Home.scss';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signupUser(email, password); 
            if (response.message === 'Utilisateur créé !') {
                setMessage("Inscription réussie. Redirection vers la page de connexion...");
                
                setTimeout(() => {
                    navigate("/"); 
                }, 3000);  
            } else {
                setMessage("Un problème est survenu lors de l'inscription.");
            }
        } 
        catch (error) {
            console.log(error); 
            setMessage("L'inscription a échoué");
        }
    };

    return (
        <div className="home">           

            <div className="home_title">
                <h1>Lorem Ipsum is simply dummy text.</h1>
                <p>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type.
                </p>
                <figure className="home_title-logo">
                    <img src={Logo} alt="Logo"/>
                </figure>
            </div>

            <div className="home_login">
                <form className="home_login-form" id="loginForm" onSubmit={handleSubmit}>
                    <h2>Créer un compte</h2>
                    <div className="home_login-form--fieldset">
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                            {message && ( 
                                <p className="error-message">{message}</p>
                            )}
                        </fieldset>
                    </div>
                    <div className="home_login-form--bouton">
                        <button className="bouton bouton_invertNoir" type="submit">S'inscrire</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}



export default Signup;