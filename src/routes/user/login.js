const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private-key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    
    User.findOne({ where: { email: req.body.email } }).then(user => {

      if(!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      }
      // bcrypt à une focntion qui compare automatiquement les mots de passe et renvoie une promesse
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect`;
          return res.status(401).json({ message })
        }

        //JWT
        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: 900 }// 15 minutes
        );
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
      })
    })
    // traitement des erreurs génériques
    .catch(error => {
      const message = `L'utilisateur' n'a pas pu être connecté. Réessayez dans quelques instants.`
      return res.json({ message, data: error })
    })
  })
}