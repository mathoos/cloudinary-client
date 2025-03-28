import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  getObjectInfo } from "../utilities/Server"; 

import Navbar from "../components/Navbar";

const Article = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user.token); 
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getObjectInfo(id, token);  
                setArticle(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article :", error);
            }
        };

        fetchArticle();
    }, [id, token]);

    if (!article) return <p>Chargement...</p>;

    return (
        <div className="article-page">
            <Navbar />
            <div className="article-content">
                <h1>{article.title}</h1>
                <img src={article.imageUrl} alt={article.title} />
                <p>{article.subtitle}</p>
                <p>{article.description.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}</p>
                <p><strong>Tag :</strong> {article.tag}</p>
                <p className={article.published ? "status published" : "status draft"}>
                    {article.published ? "Publié" : "Brouillon"}
                </p>
            </div>
        </div>
    );
};


export default Article;
