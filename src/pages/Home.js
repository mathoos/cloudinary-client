import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../utilities/Server";
import { setToken } from "../utilities/Slice";
import Navbar from '../components/Navbar';
import Logo from "../img/logo.svg";

import './Home.scss';


function Home() {

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
            // Affiche le message d'erreur capturé depuis le serveur
            setMessage(error.message || "L'authentification a échouée");
        }
    };

    return (
        <div className="home">           
            <Navbar/>

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
                    <h2>Se connecter</h2>
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
                        <button className="bouton bouton_invertNoir" type="submit">Connexion</button>
                    </div>  
                </form>
                <div className="home_login-create">
                    <p>Pas encore de compte ? <Link to="/sign-up">Créés-en un !</Link></p>
                </div>
            </div>
        </div>
    )
}


export default Home;