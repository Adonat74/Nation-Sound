const { User } = require('../../db/sequelize'); // Import du modèle User
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../../auth/auth');  // Import du middleware pour vérifier le jwt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const privateKey = require('../../credentials/private-key');

  
module.exports = (app) => { 
    app.put('/api/updateUser/', auth, (req, res) => {

        // Extraction de l'identifiant d'utilisateur à partir du jeton JWT décodé
        const userId = jwt.decode(req.headers.authorization.split(' ')[1], process.env.PRIVATE_KEY).userId;

        // Hachage du nouveau mot de passe fourni par l'utilisateur
        bcrypt.hash(`${req.body.password}`, 10)
        .then(hash => User.update({ ...req.body, password: hash }, {
            where: { id: userId.toString() }
        }))
        .then(_ => {
            // Utilisation de return pour avoir une seule gestion d'erreur 500 pour les deux promesses
            // Recherche de l'utilisateur mis à jour dans la base de données
            return User.findByPk(userId).then(user => {
                if(user === null) {
                    const message = `L'utilisateur n'existe pas. Réessayez avec un autre identifiant.`;
                    res.status(404).json({ message, data: error });
                }
        
                // Renvoyer une réponse avec un message de succès et les données de l'utilisateur
                const message = `L'utilisateur' ${user.userName} a bien été modifié.`;
                res.json({ message, data: user });
            });
        })
    
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`;
            
            res.status(500).json({ message, data: error });
        });
    });
}