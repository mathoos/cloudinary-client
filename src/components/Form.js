import React from 'react';
import './Form.scss';

const Form = ({ title, handleSubmit, closeModal, modalActive, initialData }) => {
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
    

    return (
        <div className={`modal ${modalActive ? 'active' : ''}`} onClick={handleModalClick}>
            <form className="modal_form" onSubmit={handleSubmit}>
                <button className="modal_form-close" onClick={handleCloseButtonClick}>
                    <div className="modal_form-close-barre modal_form-close-barre--1"></div>
                    <div className="modal_form-close-barre modal_form-close-barre--2"></div>
                </button>
                <h2>{title}</h2>
                <div className="modal_form-fieldset">
                    <fieldset>
                        <label htmlFor="title">Titre</label>
                        <input type="text" id="title" name="title" defaultValue={initialData.title} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" defaultValue={initialData.description} required></textarea>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="tag">Tag</label>
                        <select name="tag" id="tag-select" defaultValue={initialData.tag} required>
                            <option value="salle de bain">Salle de bain</option>
                            <option value="salle de douche">Salle de douche</option>
                            <option value="cuisine">Cuisine</option>
                            <option value="amenagement pmr">Aménagement PMR</option>
                            <option value="mobilier">Mobilier</option>
                            <option value="toilette">Toilette</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <input type="file" id="file" name="image" />
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