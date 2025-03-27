import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createObject , getObjectsByUser , getUserInfo , updateUserInfo } from "../utilities/Server"; 

import Bloc from "../components/Bloc"
import Form from '../components/Form';
import Navbar from '../components/Navbar';

import './Dashboard.scss';

const Dashboard = () => {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [things, setThings] = useState([]);
    const publishedArticles = things.filter(thing => thing.published);
    const draftArticles = things.filter(thing => !thing.published);

 
    const [userInfo, setUserInfo] = useState({ nom: "", prenom: "", profileImageUrl: "", profileImage: null });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    


    const handleAddButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false); 
    };

    const handleCreateObjectFormSubmit = async (event, formData) => {
        try {
            await createObject(formData.title, formData.description, formData.tag, formData.image, formData.published, token);
            event.target.reset(); // Reset du formulaire
            fetchData(); // Rafraîchir les données
            setShowForm(false);
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

        const formData = new FormData();
        formData.append("nom", userInfo.nom);
        formData.append("prenom", userInfo.prenom);
        formData.append("genre", userInfo.genre);

        // Vérification de l'image avant l'envoi
        if (userInfo.profileImage) {
            console.log("Image ajoutée :", userInfo.profileImage); // Debugging
            formData.append("image", userInfo.profileImage);
        } else {
            console.log("Aucune image ajoutée."); // Debugging
        }

        try {
            await updateUserInfo(token, formData);
            
            // Après la mise à jour, rafraîchissez les informations de l'utilisateur
            await fetchUserInfo();  // Récupérer les nouvelles informations
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations :", error);
        }
    };
    
    // Gestion de l'upload de l'image
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Récupérer le fichier sélectionné
        setUserInfo({ ...userInfo, profileImage: file }); // Mettre à jour l'état avec le fichier
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

   // Déclarez `fetchData` et `fetchUserInfo` avec `useCallback`
    const fetchData = useCallback(async () => {
        try {
            const data = await getObjectsByUser(id, token);
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

    const blocData = [
        { 
            title: "Articles publiés", 
            subtitle: "Les articles publiés et visibles sur votre site.",
            data : publishedArticles.length,
        },
        { 
            title: "Brouillons enregistrés", 
            subtitle: "Les articles non visibles sur votre site.", 
            data : draftArticles.length,
            content: null
        },
        { 
            title: "Total de vues", 
            subtitle: "Statistiques des vues de vos articles.", 
            content: null
        },
        { 
            title: "Articles à la une.", 
            subtitle: "Liste des 3 articles que vous avez définis à la une.", 
            content: null 
        },
        { 
            title: "Tous mes articles.", 
            subtitle: "Total de tous les articles, publiés et brouillons confondus.", 
            content: things 
        },
        { 
            title: "Créer un article", 
            subtitle: "Formulaire pour ajouter un article", 
            buttons: [
                {
                    text: "Modifier mes informations",
                    onClick: handleEditButtonClick
                },
                {
                    text: "Ajouter",
                    onClick: handleAddButtonClick
                }
            ],
            content: null 
        },
    ];

    return (
        <div className="dashboard">
            
            <div className="dashboard_container">
                <Navbar/>

                {showForm ? (
                <Form
                    title="Ajouter une photo"
                    handleSubmit={handleCreateObjectFormSubmit}
                    handleClose={handleCloseForm} // Ferme le formulaire quand on clique sur "Annuler"
                    modalActive={true}
                    initialData={{ title: '', description: '', tag: '' }}
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

                    <div className="dashboard_container-content--blocs">
                        {blocData.map((bloc, index) => (
                            <Bloc key={index} title={bloc.title} subtitle={bloc.subtitle} data={bloc.data} buttons={bloc.buttons}>
                                {bloc.content ? (
                                    <div className="bloc_container">
                                        {bloc.content.length > 0 ? (
                                            bloc.content.map(thing => (
                                                <div key={thing._id} className="card" onClick={() => handleCardClick(thing._id)}>
                                                    <img src={thing.imageUrl} alt={thing.title} />
                                                    <h3>{thing.title}</h3>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Vous n'avez créé aucun objet.</p>
                                        )}
                                    </div>
                                ) : null}
                            </Bloc>
                        ))}
                    </div>
                </div>
            )}






                {/* <div className="dashboard_container-content">

                    <div className="dashboard_container-content--user">
                        <h2>Bonjour {userInfo.prenom} !</h2>
                        {userInfo.profileImageUrl && (
                            <div className="user-img">
                                <img src={userInfo.profileImageUrl} alt="Profile" />
                            </div>
                        )}
                    </div>

                    <div className="dashboard_container-content--blocs">
                        {blocData.map((bloc, index) => (
                            <Bloc key={index} title={bloc.title} subtitle={bloc.subtitle} data={bloc.data} buttons={bloc.buttons}>
                                

                                {bloc.content ? (
                                    <div className="bloc_container">
                                        {bloc.content.length > 0 ? (
                                            bloc.content.map(thing => (
                                                <div key={thing._id} className="card" onClick={() => handleCardClick(thing._id)}>
                                                    <img src={thing.imageUrl} alt={thing.title} />
                                                    <h3>{thing.title}</h3>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Vous n'avez créé aucun objet.</p>
                                        )}
                                    </div>
                                ) : null}
                            </Bloc>
                        ))}
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
                            <div>
                                <label htmlFor="profileImage">Image de Profil</label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    name="profileImage"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit">Enregistrer</button>
                        </form>
                    )} 
                </div> */}
                
            </div>

            {/* <Form
                title="Ajouter une photo"
                handleSubmit={handleCreateObjectFormSubmit}
                closeModal={closeModal} 
                modalActive={modalActive}
                initialData={{ title: '', description: '', tag: '' }}
            /> */}
        </div>
    );
}

export default Dashboard;