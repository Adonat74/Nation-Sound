const jwt = require('jsonwebtoken'); // Importation de la bibliothèque JWT 
// const privateKey = require('../credentials/private-key'); // Importation de la clé privée pour la vérification JWT
  

// Fonction middleware pour vérifier le jeton JWT dans l'en-tête de la requête
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }
    
  // Extraction du jeton à partir de l'en-tête d'autorisation
  const token = authorizationHeader.split(' ')[1];


  // Vérification de la validité du jeton JWT à l'aide de la clé privée
  const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY, (error, decodedToken) => {
      if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
      return res.status(401).json({ message, data: error });
      }
  

      // Extraction de l'identifiant d'utilisateur à partir du jeton décodé
      const userId = decodedToken.userId;


      // Vérification de l'identifiant d'utilisateur dans le corps de la requête avec celui du jeton
      if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      res.status(401).json({ message });
      } else {
      next(); // Si tout est valide, passer au middleware suivant
      }
  });
}