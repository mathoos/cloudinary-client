import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utilities/Server";
import Logo from "../img/logo.svg";
import MailIcon from "../img/mail.svg";
import PasswordIcon from "../img/password.svg";

import './Home.scss';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState(""); 
    const [prenom, setPrenom] = useState(""); 
    const [genre, setGenre] = useState("homme");
    const [profileImage, setProfileImage] = useState(null); // Nouveau state pour l'image de profil

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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
                <form className="home_login-form" onSubmit={handleSubmit}>
                    <h2>Créer un compte</h2>
                    <div className="home_login-form--fieldset">
                         <fieldset>
                            <label htmlFor="nom">Nom</label>
                            <input type="text" id="nom" name="nom" required onChange={(e) => setNom(e.target.value)} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" id="prenom" name="prenom" required onChange={(e) => setPrenom(e.target.value)} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="genre">Genre</label>
                            <select id="genre" name="genre" onChange={(e) => setGenre(e.target.value)}>
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                            </select>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <div className="input-container">
                                <input className={`input-field ${emailError ? 'error' : ''}`} type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                                <figure className="icon">
                                    <img src={MailIcon} alt="Mail"/>
                                </figure>
                            </div>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="password">Mot de passe</label>
                            <div className="input-container">
                                <input className={`input-field ${passwordError ? 'error' : ''}`} type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                                <figure className="icon">
                                    <img src={PasswordIcon} alt="Password"/>
                                </figure>
                            </div>
                            {message && ( 
                                <p className="error-message">{message}</p>
                            )}
                        </fieldset>

                        {/* Champ de fichier pour l'image de profil */}
                        <fieldset>
                            <label htmlFor="profileImage">Image de profil</label>
                            <input type="file" id="profileImage" name="profileImage" onChange={(e) => setProfileImage(e.target.files[0])} />
                        </fieldset>
                    </div>
                    <div className="home_login-form--bouton">
                        <button className="bouton" type="submit">S'inscrire</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}

export default Signup;