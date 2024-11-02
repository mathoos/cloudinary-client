import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utilities/Server";
import Logo from "../img/logo.svg";
import MailIcon from "../img/mail.svg";
import PasswordIcon from "../img/password.svg";

import './Signup.scss';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState(""); 
    const [prenom, setPrenom] = useState(""); 
    const [genre, setGenre] = useState("homme");
    const [profileImage, setProfileImage] = useState(null); // Nouveau state pour l'image de profil

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasNumber = /\d/;
        if (password.length < 5) {
            return "Le mot de passe doit contenir au moins 5 caractères.";
        }
        if (!hasNumber.test(password)) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setNameError(false);
        setMessage("");

        const passwordError = validatePassword(password);
        if (passwordError) {
            setMessage(passwordError);
            return;
        }

        try {
            const response = await signupUser(email, password, nom, prenom, genre, profileImage);
            if (response.message === 'Utilisateur créé !') {
                setMessage("Inscription réussie. Redirection vers la page de connexion...");
                
                setTimeout(() => {
                    navigate("/");
                }, 3000);  
            } 
            else {
                setMessage("Un problème est survenu lors de l'inscription.");
            }
        } 
        catch (error) {
            console.log(error);
            setMessage("L'inscription a échoué");
        }
    };

    return (
        <div className="signup">           

            <div className="signup_title">
                <h1>Lorem Ipsum is simply dummy text.</h1>
                <p>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type.
                </p>
                <figure className="signup_title-logo">
                    <img src={Logo} alt="Logo"/>
                </figure>
            </div>

            <div className="signup_login">
                <form className="signup_login-form" onSubmit={handleSubmit}>
                    <h2>Créer un compte</h2>
                    <div className="signup_login-form--fieldset">

                        <div className="row">
                            <fieldset>
                                <label htmlFor="nom">Nom</label>
                                <div className="input-container">
                                    <input 
                                        className={`input-field ${nameError ? 'error' : ''}`} 
                                        type="text" 
                                        id="nom" 
                                        name="nom" 
                                        onChange={(e) => setNom(e.target.value)} 
                                    />
                                </div> 
                            </fieldset>
                            <fieldset>
                                <label htmlFor="prenom">Prénom</label>
                                <div className="input-container">
                                    <input 
                                        className={`input-field ${nameError ? 'error' : ''}`} 
                                        type="text" 
                                        id="prenom" 
                                        name="prenom" 
                                        onChange={(e) => setPrenom(e.target.value)} 
                                    />
                                </div>
                            </fieldset>
                        </div>

                        <fieldset>
                            <div className="row">
                                <legend>Je suis</legend>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="genre" 
                                        value="homme" 
                                        onChange={(e) => setGenre(e.target.value)} 
                                    />
                                    <span class="checkmark"></span>
                                    Un homme
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="genre" 
                                        value="femme" 
                                        onChange={(e) => setGenre(e.target.value)} 
                                    />
                                    <span class="checkmark"></span>
                                    Une femme
                                </label>
                            </div>
                        </fieldset>
                        
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <div className="input-container">
                                <input 
                                    className={`input-field ${emailError ? 'error' : ''}`} 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    onChange={(e) => setEmail(e.target.value)}/>
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
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <figure className="icon">
                                    <img src={PasswordIcon} alt="Password"/>
                                </figure>
                            </div>
                            {message && ( 
                                <p className="error-message">{message}</p>
                            )}
                        </fieldset>

                        <fieldset>
                            <label htmlFor="profileImage">Photo de profil</label>
                            <input 
                                type="file" 
                                id="profileImage" 
                                name="profileImage" 
                                onChange={(e) => setProfileImage(e.target.files[0])} />
                        </fieldset>
                    </div>

                    <div className="signup_login-form--bouton">
                        <button className="bouton" type="submit">S'inscrire</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}

export default Signup;