import React, { useState, useEffect } from 'react';
import './Form.scss';

const Form = ({ title, handleSubmit, handleClose, initialData }) => {
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        image: null,
        published: false, 
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            title: initialData.title || '',
            description: initialData.description || '',
            tag: initialData.tag || '',
            image: initialData.image || null,
            published: Boolean(initialData.published), // 🔥 Assure que c'est un booléen
        }));
    }, [initialData]);


    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === "checkbox" ? checked : value 
        }));
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    
        // Assurer que published est bien un booléen
        const finalFormData = {
            ...formData,
            published: Boolean(formData.published), // 🔥 Convertit en booléen pour éviter les erreurs
        };
    
        handleSubmit(e, finalFormData);
    };

    return (

            <form className="form" onSubmit={onSubmit}>
                <div className="form_title">
                    <h2>{title}</h2>
                    <button className="form_title-close" onClick={handleCloseButtonClick}>
                        <div className="form_title-close-barre form_title-close-barre--1"></div>
                        <div className="form_title-close-barre form_title-close-barre--2"></div>
                    </button>
                </div>
                
                <div className="form-fieldset">
                    <fieldset>
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="tag">Tag</label>
                        <select name="tag" id="tag" value={formData.tag} onChange={handleInputChange} required>
                            <option value="salle de bain">Salle de bain</option>
                            <option value="salle de douche">Salle de douche</option>
                            <option value="cuisine">Cuisine</option>
                            <option value="amenagement pmr">Aménagement PMR</option>
                            <option value="mobilier">Mobilier</option>
                            <option value="toilette">Toilette</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="file">Image actuelle :</label>
                        {initialData.image && <img src={initialData.image} alt="Objet" style={{ width: '100px', height: 'auto' }} />}
                        <input type="file" id="file" name="image" onChange={handleImageChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="published">Publier l'objet</label>
                        <input 
                            type="checkbox" 
                            id="published" 
                            name="published" 
                            checked={!!formData.published}  // 🔥 Assure que `false` est bien pris en compte
                            onChange={handleInputChange} 
                        />
                    </fieldset>
                    <button className="bouton bouton_noir" type="submit">Valider</button>
                </div>
                
            </form>

    );
};

export default Form;