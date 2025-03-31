import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../utilities/Slice";
import './Navbar.scss';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 

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
                <div className="nav_links-content">
                    <Link to="/" className="nav_links-content--link">Home</Link>
                    <Link to={`/user/${id}`} className="nav_links-content--link">Settings</Link>  
                </div>        
                <button className="bouton bouton_gris-dark nav_links-link" onClick={handleLogout}>Déconnexion</button>
            </div>
            
        </nav>     
    )
}


export default Navbar