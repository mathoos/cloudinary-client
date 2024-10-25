import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../utilities/Server";
import { setToken } from "../utilities/Slice";
import Logo from "../img/logo.svg";
import MailIcon from "../img/mail.svg";
import PasswordIcon from "../img/password.svg";

import './Home.scss';


function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);  // Erreur email
    const [passwordError, setPasswordError] = useState(false);  // Erreur mot de passe

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialise les erreurs avant chaque tentative de connexion
        setEmailError(false);
        setPasswordError(false);
        setMessage("");

        try {
            const response = await loginUser(email, password);
            const token = response.token; 
            const userId = response.userId; 
            localStorage.setItem('token', token);

            dispatch(setToken(token));
            navigate(`/user/${userId}`);
        } 
        catch (error) {
            // Capture l'erreur renvoyée par le backend
            const errorMessage = error.message || "L'authentification a échouée";

            setMessage(errorMessage);

            // Vérifie les types d'erreurs pour ajuster les inputs
            if (errorMessage.includes("Utilisateur non trouvé")) {
                setEmailError(true);
            } 
            else if (errorMessage.includes("Mot de passe incorrect")) {
                setPasswordError(true);
            }
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
                <form className="home_login-form" onSubmit={handleSubmit}>
                    <h2>Se connecter</h2>
                    <div className="home_login-form--fieldset">
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <div className="input-container">
                                <input 
                                    className={`input-field ${emailError ? 'error' : ''}`} 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email" 
                                />
                                <figure className="icon">
                                    <img src={MailIcon} alt="Mail"/>
                                </figure>
                            </div>
                            
                        </fieldset>
                        <fieldset>
                            <label htmlFor="password">Mot de passe</label>
                            <div className="input-container">
                                <input 
                                    className={`input-field ${passwordError ? 'error' : ''}`} 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password" 
                                />
                                <figure className="icon">
                                    <img src={PasswordIcon} alt="Password"/>
                                </figure>
                            </div>
                            
                            {message && ( 
                                <p className="error-message">{message}</p>
                            )}
                        </fieldset>
                    </div>
                    <div className="home_login-form--bouton">
                        <button className="bouton" type="submit">Connexion</button>
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