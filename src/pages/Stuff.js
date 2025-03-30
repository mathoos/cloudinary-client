import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux"; 
import {Link} from "react-router-dom";
import { getAllObjects } from "../utilities/Server"; 

import './Stuff.scss';

const Stuff = () => {
    const [things, setThings] = useState([]); 
    const publishedArticles = things.filter(thing => thing.published);
    const token = useSelector((state) => state.user.token); 
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllObjects(); 
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
        else {
            fetchData(); 
        }
    }, [token, navigate]); 

    return (
        <div className="stuff">
            <div className="stuff_container">
                <h2>Toutes les articles</h2>
                <div className="stuff_container-content">
                    {publishedArticles.map(thing => (
                        <Link to={`/article/${thing._id}`} key={thing._id} className="card">
                            <img src={thing.imageUrl} alt={thing.title} />
                            <h3>{thing.title}</h3> 
                            <div className="card_subtitle">
                                <p>{thing.subtitle}</p>
                            </div>
                            <p>{new Date(thing.createdAt).toLocaleDateString()}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stuff;