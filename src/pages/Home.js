import PageLayout from "../components/PageLayout";
import HomepageBackground from "../img/homepage.gif";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../utilities/Server";
import { setToken } from "../utilities/Slice";

import './Home.scss';


function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialise les erreurs avant chaque tentative de connexion

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
        }
    };

    return (


        <PageLayout
            title="Login"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            buttonText=""
            buttonLink=""
            backgroundImage={HomepageBackground}
            signupText={<>Nouveau sur la plateforme ? <Link to="/sign-up">Inscris-toi !</Link></>}
        >
        
            <form className="login" onSubmit={handleSubmit}>

                <div className="login_container">

                    <fieldset>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email" 
                            placeholder="Email"
                        />   
                    </fieldset>

                    <fieldset>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password" 
                            placeholder="Mot de passe"
                        />
                    </fieldset>

                    {message && ( 
                        <p className="error-message">{message}</p>
                    )}

                </div>
           
                <button className="bouton" type="submit">Connexion</button>
           
            </form>

        </PageLayout>
    )
}


export default Home;