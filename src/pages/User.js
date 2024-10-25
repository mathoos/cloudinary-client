import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createObject , getStuffByUser , getUserInfo , updateUserInfo } from "../utilities/Server"; 
import { useNavigate, useParams } from "react-router-dom";

import Form from '../components/Form';
import Navbar from '../components/Navbar';

import './User.scss';

const User = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const { id } = useParams(); // Récupération de l'id de l'URL
    const [things, setThings] = useState([]);
    const [modalActive, setModalActive] = useState(false); 
    const [userInfo, setUserInfo] = useState({ nom: "", prenom: "" });
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

    const fetchData = async () => {
        try {
            const data = await getStuffByUser(id, token); // Récupérer les objets pour cet utilisateur
            setThings(data); 
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des objets :", error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const userData = await getUserInfo(token);
            setUserInfo(userData); // Stocke les informations de l'utilisateur
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEditButtonClick = () => {
        setIsEditing(true); // Active l'édition
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserInfo(token, userInfo); // Appelle la fonction pour mettre à jour l'utilisateur
            setIsEditing(false); // Désactive l'édition après la mise à jour
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value }); // Met à jour les valeurs dans le state
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        fetchData(); // Appel de fetchData ici
        fetchUserInfo(); 
    }, [token, id, navigate]); 

    

    return (
        <div className="user">
            <Navbar isUserPage={true}/>
            <div className="container">
                <h2>Bonjour {userInfo.prenom}</h2>
                {!isEditing ? (
                    <button onClick={handleEditButtonClick}>Modifier mes informations</button>
                ) : (
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
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <button type="submit">Enregistrer</button>
                    </form>
                )}
                <div className="container_buttons">
                    <button className="bouton" onClick={handleAddButtonClick}>Ajouter</button>
                </div>
                <div className="container_images">
                    {things.map(thing => (
                        <div key={thing._id} className="card" onClick={() => handleCardClick(thing._id)}>
                            <img src={thing.imageUrl} alt={thing.title} />
                        </div>
                    ))}
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
    )
}

export default User;