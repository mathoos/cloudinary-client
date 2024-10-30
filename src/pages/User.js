import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { createObject , getStuffByUser , getUserInfo , updateUserInfo } from "../utilities/Server"; 
import { useNavigate, useParams } from "react-router-dom";

import Form from '../components/Form';
import Navbar from '../components/Navbar';

import './User.scss';

const User = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [things, setThings] = useState([]);
    const [modalActive, setModalActive] = useState(false); 
    const [userInfo, setUserInfo] = useState({ nom: "", prenom: "", profileImageUrl: "" });
    const [isEditing, setIsEditing] = useState(false);

    const closeModal = () => {
        setModalActive(false);
    };

    const handleAddButtonClick = () => {
        setModalActive(true); 
    };

    const handleCreateObjectFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await createObject(formData, token);
            event.target.reset();
            closeModal();
            fetchData();
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la création de l'objet :", error);
        }
    };

    const handleCardClick = async (objectId) => {
        navigate(`/image?id=${objectId}&token=${encodeURIComponent(token)}`);
    };

    const handleEditButtonClick = () => {
        setIsEditing(true); 
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateUserInfo(token, userInfo);
            setIsEditing(false);
        } 
        catch (error) {
            console.error("Erreur lors de la mise à jour des informations :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

   // Déclarez `fetchData` et `fetchUserInfo` avec `useCallback`
const fetchData = useCallback(async () => {
    try {
        const data = await getStuffByUser(id, token);
        setThings(data); 
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des objets :", error);
    }
}, [id, token]);

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
    fetchData();
    fetchUserInfo();
}, [token, id, navigate, fetchData, fetchUserInfo]);

    return (
        <div className="user">
            <Navbar isUserPage={true} />
            <div className="container">

                <div className="container_name">
                    <h2>Bonjour {userInfo.prenom}</h2>
                    {userInfo.profileImageUrl && (
                        <div className="container_name-img">
                            <img src={userInfo.profileImageUrl} alt="Profile" />
                        </div>
                    )}
                </div>
                
                <div className="container_buttons">
                    <button className="bouton" onClick={handleEditButtonClick}>Modifier mes informations</button>
                    <button className="bouton" onClick={handleAddButtonClick}>Ajouter</button>
                </div>

                {isEditing && (
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={userInfo.nom}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="prenom">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={userInfo.prenom}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="genre">Genre</label>
                            <select
                                id="genre"
                                name="genre"
                                value={userInfo.genre}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Choisir un genre</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                        <button type="submit">Enregistrer</button>
                    </form>
                )}
                <div className="container_images">
                    {things.length > 0 ? (
                        things.map(thing => (
                            <div key={thing._id} className="card" onClick={() => handleCardClick(thing._id)}>
                                <img src={thing.imageUrl} alt={thing.title} />
                            </div>
                        ))
                    ) : (
                        <p>Vous n'avez créé aucun objet.</p>
                    )}
                </div>
            </div>

            <Form
                title="Ajouter une photo"
                handleSubmit={handleCreateObjectFormSubmit}
                closeModal={closeModal} 
                modalActive={modalActive}
                initialData={{ title: '', description: '', tag: '' }}
            />
        </div>
    );
}

export default User;