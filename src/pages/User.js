import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createObject , getStuffByUser} from "../utilities/Server"; 
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

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        fetchData(); // Appel de fetchData ici
    }, [token, id, navigate]); 

    

    return (
        <div className="user">
            <Navbar isUserPage={true}/>
            <div className="container">
                <h2>Mes photos</h2>
                <div className="container_buttons">
                    <button className="bouton bouton_noir" onClick={handleAddButtonClick}>Ajouter</button>
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