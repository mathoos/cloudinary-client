// Prod
// const API_BASE_AUTH = "https://plomberie-serveur.onrender.com/api/auth";
// const API_BASE_STUFF = "https://plomberie-serveur.onrender.com/api/stuff";

//Local
const API_BASE_AUTH = "http://localhost:3000/api/auth";
const API_BASE_STUFF = "http://localhost:3000/api/stuff";


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
        return responseData;
    } catch (error) {
        console.error("Erreur lors de la requête de connexion :", error);
        throw error;
    }
}

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


export const createObject = async (formData, token) => {
    try {
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