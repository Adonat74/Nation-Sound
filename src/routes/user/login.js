const { User } = require('../../db/sequelize'); // Import du modèle User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const privateKey = require('../../credentials/private-key');
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    
    // Recherche de l'utilisateur dans la base de données par son adresse e-mail
    User.findOne({ where: { email: req.body.email } }).then(user => {

      if(!user) {
        const message = `L'utilisateur demandé n'existe pas.`;
        return res.status(404).json({ message });
      }
      // bcrypt à une focntion qui compare automatiquement les mots de passe et renvoie une promesse
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect`;
          return res.status(401).json({ message });
        }

        // Création d'un jeton JWT pour l'utilisateur authentifié
        const token = jwt.sign(
          { userId: user.id },
          process.env.PRIVATE_KEY,
          { expiresIn: 900 }// 15 minutes
        );
        // Renvoyer une réponse avec un message de succès et le jeton JWT
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token });
      });
    })
    // Gestion des erreurs potentielles lors de la connexion de l'utilisateur
    .catch(error => {
      const message = `L'utilisateur' n'a pas pu être connecté. Réessayez dans quelques instants.`;
      return res.json({ message, data: error });
    });
  });
}