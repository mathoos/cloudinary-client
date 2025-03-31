# Système de gestion de contenu - CRUD

Système de gestion de contenu qui permet à l'utilisateur connecté d'ajouter des articles sur son site. 

## Utilisation

### Créer un utilisateur

1. Cliquer sur le bouton **Login**. 
2. Cliquer sur le bouton **Nouveau sur la plateforme? Inscris toi !** qui se situe en dessous de l'image d'accueil.
3. Saisir les informations de l'uutilisateur et cliquer sur le bouton **S'inscrire**. 
4. Si l'inscription a réussi, l'utilisateur est redirigé sur la page **/login**.

### Se connecter au dashboard utilisateur

Dashboard qui regroupe le nombre d'articles publiés, le nombre de brouillon enregistrés, et un aperçu de tous les articles créés par l'utilisateur. 

1. Sur la page d'accueil, cliquer sur le bouton **Login**.
2. Insérer les identifiants et cliquer sur **Connexion**.  
    Email : test@test.fr  
    Mot de passe : test2805

### Créer un article

1. Cliquer sur le bouton **Ajouter un article** qui se situe en bas à droite. 
2. Remplir les différents champs (titre, sous-titre, description, tag, image et statut). 
3. Spécifier si l'article doit être publié ou bien enregistré en tant que brouillon. 
4. Confirmation la création de l'article en cliquant sur le bouton **Valider**.

Le formulaire se ferme et l'article créé s'affiche dans le bloc **Tous mes articles**.  En fonction du statut sélectionné, l'article sera incrémenté dans le bloc **Articles publiés** ou bien **Brouillons enregistrés**.

### Voir tous les articles 

Page qui affiche tous les articles créés par l'utilisateur dans une liste qui contient l'image, le titre, le sous-titre, le statut de l'article et la date à laquelle il a été créé.

1. Cliquer sur le bouton **Voir** dans le bloc **Tous mes articles**.

### Voir un article

Page affiche l'article dans son intégralité et sa structure finale visible par les visiteurs.

1. Cliquer sur le bouton **Voir**. 

### Modifier un article

1. Cliquer sur le bouton **Modifier**. Un formulaire apparaît avec les données pré-remplies. Il suffit de modifier les entrées souhaitées.
2. Pour confirmer la modification de l'article, cliquer sur **Valider**.
3. L'article est mis à jour.

### Supprimer un article

1. Cliquer sur le bouton **Supprimer**.
2. Confirmer ou annuler la suppression de l'article.
3. La liste des articles est mise à jour.

### Aller sur la page utilisateur

Page qui affiche les informations de l'utilisateur (Nom, prénom, genre et photo de profil). 

### Modifier les informations utilisateur 

1. Cliquer sur le bouton **Modifier mes informations**. Un formulaire apparaît avec les données pré-remplies. Il suffit de modifier les entrées souhaitées.
2. Pour confirmer la modification des informations, cliquer sur **Valider**.
3. Les informations de l'utilisateur sont mises à jour.



## Installation

- Node.js (version >=16.0.0)
- npm ou yarn
- MongoDB : Créer un compte MongoDB.

    npm install  
    npm start 
    npm test
    npm run build   
    npm run eject 

