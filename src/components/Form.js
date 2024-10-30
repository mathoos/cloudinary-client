import React, { useState, useEffect } from 'react';
import './Form.scss';

const Form = ({ title, handleSubmit, closeModal, modalActive, initialData }) => {
    
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

    const handleModalClick = (event) => {
        if (modalActive && !event.target.closest('.modal_form')) {
            closeModal();
        }
    };

    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
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
        <div className={`modal ${modalActive ? 'active' : ''}`} onClick={handleModalClick}>
            <form className="modal_form" onSubmit={onSubmit}>
                <button className="modal_form-close" onClick={handleCloseButtonClick}>
                    <div className="modal_form-close-barre modal_form-close-barre--1"></div>
                    <div className="modal_form-close-barre modal_form-close-barre--2"></div>
                </button>
                <h2>{title}</h2>
                <div className="modal_form-fieldset">
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
                </div>
                <div className="modal_form-bouton">
                    <button className="bouton bouton_noir" type="submit">Valider</button>
                </div>
            </form>
        </div>
    );
};

export default Form;