const validMusicGenre = ['Aucun', 'Rap', 'Electro', 'Rock', 'Classique', 'Jazz', 'Reggae', 'Country', 'Latine', 'Pop']

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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' }
        }
      },
      password: {
        type: DataTypes.STRING
      },
      favoritemusicgenre: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('favoritemusicgenre').split(',')
        },
        set(favoritemusicgenre) {
            this.setDataValue('favoritemusicgenre', favoritemusicgenre.join())
        },
        validate: {
            isMusicGenreValid(value) {
              if (!value) {
                throw new Error('Choisissez au moin un genre')
              }
              if (value.split(',').length > 3) {
                throw new Error('Vous ne pouvez pas choisir plus de 3 genres.')
              }
              value.split(',').forEach(type => {
                if (!validMusicGenre.includes(type)) {
                  throw new Error(`Les genre choisis doivent appartenir à la liste suivante : ${validMusicGenre}`)
                }
              });
            }
          }
      }
    })
  }