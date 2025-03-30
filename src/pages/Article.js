import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  getObjectInfo } from "../utilities/Server"; 

import './Article.scss';

const Article = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.user.token); 
    const [article, setArticle] = useState(null);

    const textRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (textRef.current && imgRef.current) {
                const textHeight = textRef.current.offsetHeight;
                imgRef.current.style.height = `${textHeight}px`;
            }
        };

        // Exécuter l'ajustement au chargement
        updateHeight();

        // Observer les changements de taille de l'élément texte
        const resizeObserver = new ResizeObserver(updateHeight);
        if (textRef.current) resizeObserver.observe(textRef.current);

        // Nettoyage de l'observateur
        return () => resizeObserver.disconnect();
    }, [article]);


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
        <div className="article">
            <div className="article_container">
                <div className="article_container-title">
                    <h1>{article.title}</h1>
                    <p>{article.subtitle}</p>
                </div>
                <div className="article_container-content">
            <figure className="article_container-content--img" ref={imgRef}>
                <img src={article.imageUrl} alt={article.title} />
            </figure>

            <div className="article_container-content--txt" ref={textRef}>
                <p>{article.description.split("\n").map((line, index) => (
                    <span key={index}>{line}<br /></span>
                ))}</p>
                <p className="bouton bouton_gris bouton_petit">{article.tag}</p>
            </div>
        </div>
                
                
                
            </div>
        </div>
    );
};


export default Article;
