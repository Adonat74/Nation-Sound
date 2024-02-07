const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private-key')
  
module.exports = (app) => {
  app.delete('/api/deleteUser', auth, (req, res) => {
    const userId = jwt.decode(req.headers.authorization.split(' ')[1], privateKey).userId

    User.findByPk(userId).then(user => {
      // réponse renvoyée si le user n'existe pas
      if(user === null) {
        const message = `L'utilisateur n'existe pas.`
        res.status(404).json({ message, data: error })
      }
      const userDeleted = user;
      // return permet d'avoir un seul .catch error 500 pour les deux .then
      return User.destroy({
        where: { id: userId }
      })
      .then(_ => {
        const message = `L'utilisateur ${userDeleted.userName} a bien été supprimé.`
        res.json({message, data: userDeleted })
      })
    })
    // .catch renvoie l'érreur si la promesse n'est pas satisfaite et y ajoute un message explicatif
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}