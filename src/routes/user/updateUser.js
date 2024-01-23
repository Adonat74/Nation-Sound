const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private-key')

  
module.exports = (app) => {
    app.put('/api/updateUser/', auth, (req, res) => {
        const userId = jwt.decode(req.headers.authorization.split(' ')[1], privateKey).userId

        bcrypt.hash(`${req.body.password}`, 10)
        .then(hash => User.update({ ...req.body, password: hash }, {
            where: { id: userId.toString() }
        }))
        .then(_ => {
            // return permet d'avoir un seul .catch error 500 pour les deux .then
            return User.findByPk(userId).then(user => {
                if(user === null) {
                const message = `L'utilisateur n'existe pas. Réessayez avec un autre identifiant.`
                res.status(404).json({ message, data: error })
                }
        
        
                console.log(userId)
        
        
                const message = `L'utilisateur' ${user.username} a bien été modifié.`
                res.json({message, data: user })
            })
        })
    
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
            
            res.status(500).json({ message, data: error })
        })
    })
}