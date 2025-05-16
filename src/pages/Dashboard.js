import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createObject , getObjectsByUser , getUserInfo } from "../utilities/Server"; 

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
    const [showForm, setShowForm] = useState(false);

    


    const handleAddButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false); 
    };

    const handleCreateObjectFormSubmit = async (event, formData) => {
        try {
            await createObject(formData.title, formData.subtitle, formData.description, formData.tag, formData.image, formData.published, token);
            event.target.reset(); // Reset du formulaire
            fetchData(); // Rafraîchir les données
            setShowForm(false);
        } 
        catch (error) {
            console.error("Une erreur s'est produite lors de la création de l'objet :", error);
        }
    };


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
            title: "Articles à la une", 
            subtitle: "Liste des 3 articles que vous avez définis à la une.", 
            content: null 
        },
        { 
            title: "Tous mes articles", 
            subtitle: "Total de tous les articles, publiés et brouillons confondus.", 
            content: things,
            link: { 
                text: "Voir", 
                url: `/mes-articles/${id}` 
            }
        },
        { 
            title: "", 
            subtitle: "", 
            buttons: [
                {
                    text: "Ajouter un article",
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
                    title="Ajouter un article"
                    handleSubmit={handleCreateObjectFormSubmit}
                    handleClose={handleCloseForm} 
                    modalActive={true}
                    initialData={{ title: '', subtitle: '', description: '', tag: '' }}
                />
            ) : (
                <div className="dashboard_container-content">
                    <Link to={`/user/${id}`} className="dashboard_container-content--user">
                        <h2>Bonjour {userInfo.prenom} !</h2>
                        {userInfo.profileImageUrl && (
                            <div className="user-img">
                                <img src={userInfo.profileImageUrl} alt="Profile" />
                            </div>
                        )}
                    </Link>

                    <div className="dashboard_container-content--blocs">
                        {blocData.map((bloc, index) => (
                            <Bloc key={index} title={bloc.title} subtitle={bloc.subtitle} data={bloc.data} link={bloc.link} buttons={bloc.buttons}>
                                {bloc.content ? (
                                    <div className="bloc_container">
                                        {bloc.content.length > 0 ? (
                                            bloc.content.map(thing => (
                                                <div key={thing._id} className="card">
                                                    <img src={thing.imageUrl} alt={thing.title} />
                                                    <h4>{thing.title}</h4>
                                                    <p>{new Date(thing.createdAt).toLocaleDateString()}</p>
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
            </div>
        </div>
    );
}

export default Dashboard;