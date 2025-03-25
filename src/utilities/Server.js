// // Prod
// const API_BASE_AUTH = "https://cloudinary-serveur.onrender.com/api/auth";
// const API_BASE_OBJECT = "https://cloudinary-serveur.onrender.com/api/object";

//Local
const API_BASE_AUTH = "http://localhost:3000/api/auth";
const API_BASE_OBJECT = "http://localhost:3000/api/object";


export const signupUser = async (email, password, nom, prenom, genre, image) => {

    try {
        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("genre", genre);

        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(`${API_BASE_AUTH}/signup`, {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "L'inscription a échoué");
        }

        return responseData;
    } 

    catch (error) {
        console.error("Erreur lors de la requête d'inscription :", error);
        throw error;
    }
};


export const loginUser = async (email, password) => {

    try {
        const response = await fetch(`${API_BASE_AUTH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData); 
            throw new Error(responseData.error || "Une erreur est survenue lors de la connexion");
        }

        return responseData;
    } 
    
    catch (error) {
        console.error("Erreur lors de la requête de connexion :", error.message);
        throw error; 
    }
};


export const getUserInfo = async (token) => {

    try {
        const response = await fetch(`${API_BASE_AUTH}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData); 
            throw new Error(responseData.message || "Une erreur s'est produite lors de la récupération des informations de l'utilisateur.");
        }

        
        return responseData;
    } 
    
    catch (error) {
        console.error("Erreur lors de la requête de récupération des informations de l'utilisateur :", error.message);
        throw error; 
    }
};


export const updateUserInfo = async (token, formData) => {

    try {
        const response = await fetch(`${API_BASE_AUTH}/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData); 
            throw new Error(responseData.message || "La mise à jour des informations a échoué.");
        }

        return responseData;
    } 
    
    catch (error) {
        console.error("Erreur lors de la mise à jour des informations :", error.message);
        throw error; 
    }
};


export const createObject = async (title, description, tag, image, token) => {

    try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("tag", tag);

        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(`${API_BASE_OBJECT}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La création de l'objet a échouée.");
        }
    } 

    catch (error) {
        console.error("Erreur lors de la requête de création d'objet :", error);
        throw error;
    }
};


export const getObjectsByUser = async (userId, token) => {

    try {
        const response = await fetch(`${API_BASE_OBJECT}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (response.status === 404) {
            return []; 
        }

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La récupération des objets a échouée.");
        }
        
        return responseData;
    } 
    
    catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des objets :", error);
        throw error;
    }
};


export const getAllObjects = async () => {

    try {
        const response = await fetch(`${API_BASE_OBJECT}`, {
            method: "GET",
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La requête a échouée.");
        }

        return responseData;
    } 
    
    catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des objets :", error);
        throw error;
    }
};


export const getObjectInfo = async (objectId, token) => {

    try {
        const response = await fetch(`${API_BASE_OBJECT}/${objectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La récupération de l'objet a échoué.");
        }

        return responseData;
    } 
    
    catch (error) {
        console.error("Une erreur s'est produite lors de la récupération de l'objet :", error);
        throw error;
    }
}


export const updateObject = async (objectId, formData, token) => {

    try {
        const response = await fetch(`${API_BASE_OBJECT}/${objectId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La modification de l'objet a échoué.");
        }

        return responseData; 
    } 
    
    catch (error) {
        console.error("Une erreur s'est produite lors de la modification de l'objet :", error);
        throw error;
    }
};


export const deleteObject = async (objectId, token) => {

    try {
        const response = await fetch(`${API_BASE_OBJECT}/${objectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            return { success: true, message: 'Objet supprimé avec succès' };
        } 

        else {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "La suppression de l'objet a échoué.");
        }
    } 
    
    catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'objet :", error);
        throw error;
    }
};