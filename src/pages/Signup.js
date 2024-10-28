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
    const [nom, setNom] = useState("");            // Nouveau state pour le nom
    const [prenom, setPrenom] = useState("");       // Nouveau state pour le prénom
    const [genre, setGenre] = useState("homme");    // Nouveau state pour le genre

    const [emailError, setEmailError] = useState(false);  // Erreur email
    const [passwordError, setPasswordError] = useState(false);  // Erreur mot de passe

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Fonction de validation du mot de passe
    const validatePassword = (password) => {
        const hasNumber = /\d/; // Regex pour vérifier s'il y a un chiffre
        if (password.length < 5) {
            return "Le mot de passe doit contenir au moins 5 caractères.";
        }
        if (!hasNumber.test(password)) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }
        return null;
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialise les erreurs avant chaque tentative de connexion
        setEmailError(false);
        setPasswordError(false);
        setMessage("");

        // Valide le mot de passe avant de l'envoyer
        const passwordError = validatePassword(password);
        if (passwordError) {
            setMessage(passwordError);
            return;  // Ne continue pas si le mot de passe n'est pas valide
        }

        try {
            // Envoie les champs supplémentaires au backend
            const response = await signupUser(email, password, nom, prenom, genre);
            if (response.message === 'Utilisateur créé ! Un email de confirmation a été envoyé.') {
                setMessage("Inscription réussie ! Un email de confirmation a été envoyé à votre adresse.");
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
                         {/* Nouveau champ pour le nom */}
                         <fieldset>
                            <label htmlFor="nom">Nom</label>
                            <input type="text" id="nom" name="nom" required onChange={(e) => setNom(e.target.value)} />
                        </fieldset>

                        {/* Nouveau champ pour le prénom */}
                        <fieldset>
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" id="prenom" name="prenom" required onChange={(e) => setPrenom(e.target.value)} />
                        </fieldset>

                        {/* Nouveau champ pour le genre */}
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