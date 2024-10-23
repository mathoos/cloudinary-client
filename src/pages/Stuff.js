import { useEffect, useState } from "react";
import { getAllStuff } from "../utilities/Server"; 
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import { useSelector } from "react-redux"; // Importer useSelector
import './User.scss';

const Stuff = () => {
    const [things, setThings] = useState([]); // État pour stocker les objets
    const token = useSelector((state) => state.user.token); // Récupérer le token depuis Redux
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

    const fetchData = async () => {
        try {
            const data = await getAllStuff(); // Récupérer tous les objets
            setThings(data); // Mettre à jour l'état avec les objets récupérés
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des objets :", error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        } else {
            fetchData(); // Appeler fetchData lorsque le composant est monté
        }
    }, [token, navigate]); // Dépendances pour s'assurer que l'effet s'exécute lorsque le token change

    return (
        <div className="user">
            <Navbar isUserPage={true} />
            <div className="container">
                <h2>Toutes les photos</h2>
                <div className="container_images">
                    {things.map(thing => (
                        <div key={thing._id} className="card">
                            <img src={thing.imageUrl} alt={thing.title} />
                            <p>{thing.title}</p> {/* Affichez le titre ou la description si nécessaire */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stuff;