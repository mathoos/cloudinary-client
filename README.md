# 📝 Système de gestion de contenu - CRUD

Système de gestion de contenu qui permet à l'utilisateur connecté d'ajouter des articles sur son site. 

## 🚀 Fonctionnalités

✅ Créer un article  
✅ Modifier un article  
✅ Supprimer un article  
✅ Publier una article
✅ Enregistrer un article en tant que brouillon
✅ Voir la liste des articles  
✅ Gérer son profil utilisateur

## 🎯 Utilisation 

### 👤 Créer un utilisateur

1️⃣ Cliquer sur le bouton **Login**.   
2️⃣ Cliquer sur le bouton **Nouveau sur la plateforme? Inscris toi !**.  
3️⃣Saisir les informations de l'utilisateur et cliquer sur le bouton **S'inscrire**.  
4️⃣ Si l'inscription a réussi, l'utilisateur est redirigé sur la page **/login**.

### 🔑 Se connecter au dashboard utilisateur

Dashboard qui regroupe le nombre d'articles publiés, le nombre de brouillon enregistrés, et un aperçu de tous les articles créés par l'utilisateur. 

1️⃣ Sur la page d'accueil, cliquer sur le bouton **Login**.  
2️⃣ Insérer les identifiants et cliquer sur **Connexion**.  

**Compte test** :  
Email : `test@test.fr`  
Mot de passe : `test2805` 

### ✍️ Créer un article

1️⃣ Cliquer sur le bouton **Ajouter un article** qui se situe en bas à droite.  
2️⃣ Remplir les différents champs (titre, sous-titre, description, tag, image et statut).  
3️⃣ Spécifier si l'article doit être publié ou bien enregistré en tant que brouillon.  
4️⃣ Confirmer la création de l'article en cliquant sur le bouton **Valider**.

L'article apparaît dans le bloc **Tous mes articles** du dashobard.  
📌 Si **publié** → Il est incrémenté dans **Articles publiés**.  
📌 Si **brouillon** → Il est incrémenté **Brouillons enregistrés**.


### 👀 Voir tous les articles 

Page qui affiche tous les articles créés par l'utilisateur dans une liste qui contient l'image, le titre, le sous-titre, le statut de l'article et la date à laquelle il a été créé.

1️⃣ Cliquer sur le bouton **Voir** dans le bloc **Tous mes articles**.    

### 👀 Voir un article

Page affiche l'article dans son intégralité et sa structure finale visible par les visiteurs.

1️⃣ Cliquer sur le bouton **Voir**. 

### ✏️ Modifier un article

1️⃣ Cliquer sur le bouton **Modifier**.  
2️⃣ Mettre à jour les champs souhaités.  
3️⃣ Cliquer sur **Valider**.

📌 L'article est mis à jour !

### 🗑️ Supprimer un article

1️⃣ Cliquer sur le bouton **Supprimer**.  
2️⃣ Confirmer ou annuler la suppression de l'article.

📌 La liste des articles est mise à jour !

### 👤 Aller sur la page utilisateur

Page qui affiche les informations de l'utilisateur (Nom, prénom, genre et photo de profil). 

1️⃣ Cliquer sur la photo de profil de l'utilisateur.

### ✏️ Modifier les informations utilisateur 

1️⃣ Cliquer sur le bouton **Modifier mes informations**.  
2️⃣ Modifier les champs souhaités.  
3️⃣ Pour confirmer la modification des informations, cliquer sur **Valider**.  

📌 Les informations de l'utilisateur sont mises à jour !


## Installation 

### ⚙️ Prérequis

🔹 Node.js (version >=16.0.0)  
🔹 npm ou yarn  
🔹 MongoDB (Créer un compte MongoDB)  

    npm install  
    npm start 
    npm test
    npm run build   
    npm run eject 


