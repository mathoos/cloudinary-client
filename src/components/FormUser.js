import React, { useState, useEffect } from 'react';
import './Form.scss';

function FormUser({ title, handleSubmit, handleClose, initialData }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        genre: '',
        profileImage: null,
        profileImageUrl: '',
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            nom: initialData.nom || '',
            prenom: initialData.prenom || '',
            genre: initialData.genre || '',
            profileImageUrl: initialData.profileImageUrl || '',
        }));
    }, [initialData]);

    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                profileImage: file,
                profileImageUrl: imageUrl, 
            }));
        }
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
                    <label htmlFor="nom">Nom</label>
                    <input 
                        type="text" 
                        id="nom" 
                        name="nom" 
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="prenom">Prénom</label>
                    <input 
                        type="text" 
                        id="prenom" 
                        name="prenom" 
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        required
                    />
                </fieldset>
                <fieldset>
                    <legend>Je suis</legend>
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="genre" 
                            value="homme" 
                            checked={formData.genre === "homme"}
                            onChange={handleInputChange} 
                        />
                        <span className="checkmark"></span>
                        Un homme
                    </label>
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="genre" 
                            value="femme" 
                            checked={formData.genre === "femme"}
                            onChange={handleInputChange} 
                        />
                        <span className="checkmark"></span>
                        Une femme
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="profileImage">Image actuelle :</label>
                    {formData.profileImageUrl && (
                        <img src={formData.profileImageUrl} alt="Profil" style={{ width: '100px', height: 'auto' }} />
                    )}
                    <input 
                        type="file" 
                        id="profileImage" 
                        name="profileImage" 
                        onChange={handleImageChange}
                    />
                </fieldset>
                <button className="bouton bouton_primary" type="submit">Valider</button>
            </div>
        </form>
    );
}

export default FormUser;