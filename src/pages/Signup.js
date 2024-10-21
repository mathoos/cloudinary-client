import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utilities/Server"; 
import './Login.scss';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signupUser(email, password); // Appelle la fonction signup
            console.log(response); 
            setMessage("Inscription réussie !");
            navigate("/login"); // Redirection vers la page de connexion après le succès
        } 
        catch (error) {
            console.log(error.response.data); 
            setMessage("L'inscription a échoué");
        }
    };

    return (
        <div className="login">
            <div className="header_login">
                <form className="header_login-form" id="signupForm" onSubmit={handleSubmit}>
                    <h1>S'inscrire</h1>
                    <div className="header_login-form--fieldset">
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                        <fieldset id="error-message" className="error-message">
                            {message ? <p>{message}</p> : null}
                        </fieldset>
                    </div>
                    <div className="header_login-form--bouton">
                        <button className="bouton bouton_invertNoir" type="submit">Créer</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}



export default Signup;