import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo , updateUserInfo } from "../utilities/Server"; 

import Navbar from '../components/Navbar';
import FormUser from '../components/FormUser';

import './Dashboard.scss';

const User = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const { id } = useParams(); 



    const [userInfo, setUserInfo] = useState({ nom: "", prenom: "", genre: "", profileImageUrl: "", profileImage: null });
    const [showForm, setShowForm] = useState(false);

    const handleEditButtonClick = () => {
     
        setShowForm(true);
    };

    const handleFormSubmit = async (event, updatedData) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("nom", updatedData.nom);
        formData.append("prenom", updatedData.prenom);
        formData.append("genre", updatedData.genre);
    
        if (updatedData.profileImage instanceof File) {
            formData.append("image", updatedData.profileImage);
        }
    
        try {
            await updateUserInfo(token, formData);
            await fetchUserInfo();  
    
            setShowForm(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations :", error);
        }
    };
    
    
    const handleCloseForm = () => {
        setShowForm(false);
    };

    const fetchUserInfo = useCallback(async () => {
        try {
            const userData = await getUserInfo(token);
            setUserInfo(userData);
        } catch (error) {
            console.error(error.message);
        }
    }, [token]);

    // Puis utilisez-les dans `useEffect`
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        fetchUserInfo();
    }, [token, id, navigate, fetchUserInfo]);


    return (
        <div className="dashboard">
            <div className="dashboard_container">
                <Navbar />
                {showForm ? (
                    <FormUser
                        title="Modifier mes informations"
                        handleSubmit={handleFormSubmit}
                        handleClose={handleCloseForm}
                        modalActive={true}
                        initialData={userInfo ? {
                            nom: userInfo.nom || '',
                            prenom: userInfo.prenom || '',
                            genre: userInfo.genre || '',
                            profileImageUrl: userInfo.profileImageUrl || '',
                        } : {}}
                    />
                
                ) : (
                    <div className="dashboard_container-content">

                        <div className="dashboard_container-content--user">
                            <h2>Bonjour {userInfo.prenom} !</h2>
                            {userInfo.profileImageUrl && (
                                <div className="user-img">
                                    <img src={userInfo.profileImageUrl} alt="Profile" />
                                </div>
                            )}
                        </div>
                        <div className="dashboard_container-content--stuff">
                            <button 
                                className="bouton bouton_gris-dark" 
                                onClick={() => handleEditButtonClick()}>Modifier mes informations
                            </button>
                        </div>

                    </div> 
                )}
            </div>
        </div>
    );
}

export default User;
