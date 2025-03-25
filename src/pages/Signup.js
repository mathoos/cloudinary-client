import PageLayout from "../components/PageLayout";
import HomepageBackground from "../img/homepage.gif";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utilities/Server";


import './Login.scss';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState(""); 
    const [prenom, setPrenom] = useState(""); 
    const [genre, setGenre] = useState("homme");
    const [profileImage, setProfileImage] = useState(null); 

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [profileImageError, setProfileImageError] = useState("");
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

    const validateFile = (profileImage) => {
        if (profileImage && profileImage.size > 300 * 1024) {
            return "La création du compte a échoué car le fichier sélectionné est trop volumineux. Veuillez choisir une image de moins de 300 Ko.";
        }
        return null; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError("");
        setProfileImageError("");
        setMessage("");

        const passwordError = validatePassword(password);
        const fileError = validateFile(profileImage);

        if (passwordError) {
            setPasswordError(passwordError);
            return;
        } 
        else {
            setPasswordError("");
        }

        if (fileError) { 
            setProfileImageError(fileError);
            return;
        } 
        else {
            setProfileImageError("");
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

        <PageLayout
            title="Sign up"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            buttonText=""
            buttonLink=""
            backgroundImage={HomepageBackground}
        >
        
            <form className="login" onSubmit={handleSubmit}>
                
                <div className="login_container">
                    <div className="row">
                        <fieldset>
                            <input 
                                type="text" 
                                id="nom" 
                                name="nom" 
                                onChange={(e) => setNom(e.target.value)} 
                                placeholder="Nom"
                            />
                        </fieldset>
                        <fieldset>
                            <input 
                                type="text" 
                                id="prenom" 
                                name="prenom" 
                                onChange={(e) => setPrenom(e.target.value)} 
                                placeholder="Prénom"
                            />
                        </fieldset>
                    </div>

                    <div className="row">
                    
                        <fieldset>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </fieldset>

                        <fieldset>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe"
                            />
                        
                            {passwordError && ( 
                                <p className="error-message">{passwordError}</p> 
                            )}
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
                                <span className="checkmark"></span>
                                Un homme
                            </label>
                            <label className="radio-label">
                                <input 
                                    type="radio" 
                                    name="genre" 
                                    value="femme" 
                                    onChange={(e) => setGenre(e.target.value)} 
                                />
                                <span className="checkmark"></span>
                                Une femme
                            </label>
                        </div>
                    </fieldset>

                    <fieldset>
                        
                            <input 
                                type="file" 
                                id="profileImage" 
                                name="profileImage" 
                                onChange={(e) => setProfileImage(e.target.files[0])} 
                                placeholder="coucou"
                            />
                            {(profileImageError || message) && ( 
                                <p className="error-message">
                                    {profileImageError || message}
                                </p>
                            )}
                    
                    </fieldset>
                </div>

                <button className="bouton" type="submit">S'inscrire</button>
    
            </form>
            
        </PageLayout>
    );
}

export default Signup;