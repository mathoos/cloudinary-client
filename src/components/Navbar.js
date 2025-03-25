import React from 'react';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../utilities/Slice";
import { useNavigate } from "react-router-dom";
import './Navbar.scss';

const Navbar = ({ isUserPage , isHomePage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            dispatch(clearToken());
            localStorage.removeItem('token');
            navigate("/");
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la déconnexion :", error);
        }
    };


    return(   
              
        <nav className="nav">

            <div className="nav_links">
                <Link to="/" className="nav_links-link">Home</Link>
                <Link to="/" className="nav_links-link">Créer un article</Link>
                <Link to="/" className="nav_links-link">Settings</Link>           
                <button className="nav_links-link" onClick={handleLogout}>Déconnexion</button>
            </div>
            
        </nav>     
    )
}


export default Navbar