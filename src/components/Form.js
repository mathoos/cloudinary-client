import React, { useState, useEffect } from 'react';
import './Form.scss';

const Form = ({ title, handleSubmit, handleClose, initialData }) => {
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        image: null,
    });

    useEffect(() => {
        setFormData({
            title: initialData.title || '',
            description: initialData.description || '',
            tag: initialData.tag || '',
            image: null, 
        });
    }, [initialData]);


    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, formData);
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
                    <button className="bouton bouton_noir" type="submit">Valider</button>
                </div>
                
            </form>

    );
};

export default Form;