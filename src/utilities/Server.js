// // Prod
// const API_BASE_AUTH = "https://cloudinary-serveur.onrender.com/api/auth";
// const API_BASE_STUFF = "https://cloudinary-serveur.onrender.com/api/stuff";

//Local
const API_BASE_AUTH = "http://localhost:3000/api/auth";
const API_BASE_STUFF = "http://localhost:3000/api/stuff";


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
            body: formData, // Envoie le FormData directement
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Erreur backend:", responseData);  
            throw new Error(responseData.message || "L'inscription a échoué");
        }

        return responseData;
    } catch (error) {
        console.error("Erreur lors de la requête d'inscription :", error);
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

        const response = await fetch(`${API_BASE_STUFF}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
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

        // Vérifie le statut de la réponse et lève une erreur si ce n'est pas 200 OK
        if (!response.ok) {
            throw new Error(responseData.error || "Une erreur est survenue lors de la connexion");
        }

        return responseData;
    } catch (error) {
        console.error("Erreur lors de la requête de connexion :", error.message);
        throw error;  // Propager l'erreur
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

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Une erreur s'est produite lors de la récupération des informations de l'utilisateur : ${error.message}`);
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

        if (!response.ok) {
            throw new Error('La mise à jour des informations a échoué');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour des informations : ${error.message}`);
    }
};


export const getAllStuff = async () => {
    try {
        const response = await fetch(`${API_BASE_STUFF}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Une erreur s'est produite lors de la récupération des objets : ${error.message}`);
    }
};

export const getStuffByUser = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_STUFF}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Vérifiez si le statut de la réponse est 404, ce qui signifie qu'il n'y a pas d'objets pour cet utilisateur
        if (response.status === 404) {
            return []; // Retourne un tableau vide si aucun objet n'existe pour cet utilisateur
        }

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Une erreur s'est produite lors de la récupération des objets : ${error.message}`);
    }
};





export const getObjectDetails = async (objectId, token) => {
    try {
        const response = await fetch(`${API_BASE_STUFF}/${objectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Une erreur s'est produite lors de la récupération des détails de l'objet : ${error.message}`);
    }
}


export const modifyObject = async (objectId, formData, token) => {
    try {
        const response = await fetch(`${API_BASE_STUFF}/${objectId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }

        const data = await response.json();
        console.log(data.message);
        return data; 
    } catch (error) {
        console.error("Une erreur s'est produite lors de la modification de l'objet :", error);
        throw error;
    }
};


export const deleteObject = async (objectId, token) => {
    try {
        const response = await fetch(`${API_BASE_STUFF}/${objectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return { success: true, message: 'Objet supprimé avec succès' };
        } 
        else {
            throw new Error('La suppression de l\'objet a échoué');
        }
    } catch (error) {
        throw new Error('Une erreur s\'est produite lors de la suppression de l\'objet : ' + error.message);
    }
};