import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getObjectsByUser, getUserInfo } from "../utilities/Server"; 

import Navbar from '../components/Navbar';
import './Dashboard.scss';

const Stuff = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const { id } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
    const [things, setThings] = useState([]);
    const [userInfo, setUserInfo] = useState({profileImageUrl: "", profileImage: null });

    const handleCardClick = async (objectId) => {
        navigate(`/image?id=${objectId}&token=${encodeURIComponent(token)}`);
    };

    // Fonction pour récupérer les objets de l'utilisateur
    const fetchData = useCallback(async () => {
        try {
            const data = await getObjectsByUser(id, token);
            setThings(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des objets :", error);
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

    



    // Vérification du token et récupération des données
    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchData();
            fetchUserInfo();
        }
    }, [token, navigate, fetchData, fetchUserInfo]);

    return (
        <div className="dashboard">
            <div className="dashboard_container">
                <Navbar />
                <div className="dashboard_container-content">
                    <div className="dashboard_container-content--user">
                        <h2>Tous mes articles</h2>
                        {userInfo.profileImageUrl && (
                            <div className="user-img">
                                <img src={userInfo.profileImageUrl} alt="Profile" />
                            </div>
                        )}
                    </div>

                    <div className="dashboard_container-content--stuff">
                        {things.length > 0 ? (
                            things.map(thing => (
                                <div key={thing._id} className="card" onClick={() => handleCardClick(thing._id)}>
                                    <img src={thing.imageUrl} alt={thing.title} />
                                    <p>{thing.title}</p>
                                </div>
                            ))
                        ) : (
                            <p>Vous n'avez créé aucun objet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stuff;








// import { useEffect, useState } from "react";
// import { getAllObjects } from "../utilities/Server"; 
// import Navbar from '../components/Navbar';
// import { useNavigate } from "react-router-dom"; // Importer useNavigate
// import { useSelector } from "react-redux"; // Importer useSelector
// import './Dashboard.scss';

// const Stuff = () => {
//     const [things, setThings] = useState([]); // État pour stocker les objets
//     const token = useSelector((state) => state.user.token); // Récupérer le token depuis Redux
//     const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

//     const fetchData = async () => {
//         try {
//             const data = await getAllObjects(); // Récupérer tous les objets
//             setThings(data); // Mettre à jour l'état avec les objets récupérés
//         } catch (error) {
//             console.error("Une erreur s'est produite lors de la récupération des objets :", error);
//         }
//     };

//     useEffect(() => {
//         if (!token) {
//             navigate('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
//         } else {
//             fetchData(); // Appeler fetchData lorsque le composant est monté
//         }
//     }, [token, navigate]); // Dépendances pour s'assurer que l'effet s'exécute lorsque le token change

//     return (
//         <div className="user">
//             <Navbar isUserPage={true} />
//             <div className="container">
//                 <h2>Toutes les photos</h2>
//                 <div className="container_images">
//                     {things.map(thing => (
//                         <div key={thing._id} className="card">
//                             <img src={thing.imageUrl} alt={thing.title} />
//                             <p>{thing.title}</p> {/* Affichez le titre ou la description si nécessaire */}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Stuff;