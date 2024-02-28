const { User } = require('../../db/sequelize'); // Import du modèle User
const auth = require('../../auth/auth'); // Import du middleware pour vérifier le jwt
const jwt = require('jsonwebtoken'); 
const privateKey = require('../../credentials/private-key');
  
module.exports = (app) => {
  app.delete('/api/deleteUser', auth, (req, res) => {

    // Extraction du userId à partir du jeton JWT décodé
    const userId = jwt.decode(req.headers.authorization.split(' ')[1], privateKey).userId;

    // Recherche de l'utilisateur dans la base de données
    User.findByPk(userId).then(user => {
      // réponse renvoyée si le user n'existe pas
      if(user === null) {
        const message = `L'utilisateur n'existe pas.`;
        res.status(404).json({ message, data: error });
      }
      const userDeleted = user;
      // Utilisation de return pour avoir une seule gestion d'erreur 500 pour les deux promesses
      return User.destroy({
        where: { id: userId }
      })
      .then(_ => {
        const message = `L'utilisateur ${userDeleted.userName} a bien été supprimé.`;
        res.json({message, data: userDeleted });
      });
    })
    // .catch renvoie l'erreur si la promesse n'est pas satisfaite et y ajoute un message explicatif
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
  });
}