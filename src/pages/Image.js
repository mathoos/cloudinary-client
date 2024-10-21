import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getObjectDetails , modifyObject, deleteObject} from '../utilities/Server';

import Form from '../components/Form';
import './Image.scss';

function Image() {

    const [objectDetails, setObjectDetails] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [modalActive, setModalActive] = useState(false);
    const objectId = queryParams.get('id');

    useEffect(() => {
        const fetchObject = async () => {
            try {
                const data = await getObjectDetails(objectId, token);
                setObjectDetails(data);
            } 
            catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des détails de l'objet :", error);
            }
        };

        fetchObject();
    }, [objectId, token]);

    const closeModal = () => {
        setModalActive(false);
    };

    const handleEditObjectFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await modifyObject(objectId, formData, token);
            const newData = await getObjectDetails(objectId, token);
            setObjectDetails(newData);
            setModalActive(false); 
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la modification de l'objet :", error);
        }
    };

    const handleEditButtonClick = () => {
        setModalActive(true); 
    };

    const handleDeleteButtonClick = async () => {
        try {
            await deleteObject(objectId, token);
            navigate("/user");
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la suppression de l'objet :", error);
        }
    };


    return (
        <div className="image">
            <div className="container">
                <div className="container_objet" id="objectDetails">
                    <figure className="container_objet-img">
                        <img src={objectDetails.imageUrl} alt={objectDetails.title} />
                    </figure>
                    <div className="container_objet-details">
                        <h2>{objectDetails.title}</h2>
                        <p className="container_objet-details--description">{objectDetails.description}</p>
                        <button className="bouton btnFiltre">{objectDetails.tag}</button>
                    </div>
                </div>
                <div className="container_buttons">
                    <button className="bouton bouton_invertNoir" onClick={handleEditButtonClick}>Modifier</button>
                    <button className="bouton bouton_invertNoir" onClick={handleDeleteButtonClick}>Supprimer</button>
                </div>
            </div>

            <Form
                title="Modifier ma photo"
                handleSubmit={handleEditObjectFormSubmit}
                closeModal={closeModal}
                modalActive={modalActive}
                initialData={{
                    title: objectDetails.title || '',
                    description: objectDetails.description || '',
                    tag: objectDetails.tag || ''
                }}
            />
        </div>
    )
}

export default Image;