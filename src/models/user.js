const validMusicGenre = ['aucun', 'rap', 'electro', 'rock', 'classique', 'jazz', 'reggae', 'country', 'latine', 'pop']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' }
        }
      },
      password: {
        type: DataTypes.STRING
      },
      favoriteMusicGenre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isMusicGenreValid(value) {
              if (!value) {
                throw new Error('Choisissez un genre')
              }
              if (!validMusicGenre.includes(value)) {
                throw new Error(`Les genre choisis doivent appartenir à la liste suivante : ${validMusicGenre}`)
              }
            }
          }
      }
    })
  }