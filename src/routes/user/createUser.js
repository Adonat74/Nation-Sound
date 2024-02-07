const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
    app.post('/api/createUser', (req, res) => {

        bcrypt.hash(`${req.body.password}`, 10)
        .then(hash => User.create({ ...req.body, password: hash }))
        .then(user => {
            const message = `L'utilisateur ${req.body.userName} a bien été crée.`
            res.json({ message, data: user })
        })

        .catch(error => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error })
          }
          const message = `L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    })
}