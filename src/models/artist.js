const validMusicGenre = ['Autre', 'Rap', 'Electro', 'Rock', 'Classique', 'Jazz', 'Reggae', 'Country', 'Latine', 'Pop']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Artist', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' }
        }
      },
      artistdescription: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'La description ne peut pas être vide.' }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: { msg: 'Utilisez un URL valide pour l\'image.' },
          notNull: { msg: "L'image est une propriété requise." }
        }
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers entre 1 et 3 pour les jours' },
          notNull: { msg: 'Le jour est une propriété requise.' },
          min: {
            args: [1],
            msg: 'Choisissez un jour entre 1 et 3.'
          },
          max: {
            args: [3],
            msg: 'Choisissez un jour entre 1 et 3.'
          }
        }
      },
      hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers entre 0 et 24 pour les heures' },
          notNull: { msg: "L'heure est une propriété requise." },
          min: {
            args: [0],
            msg: 'Choisissez une heure entre 0 et 24.'
          },
          max: {
            args: [24],
            msg: 'Choisissez une heure entre 0 et 24.'
          }
        }
      },
      scene: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers entre 1 et 5 pour la scène' },
          notNull: { msg: "La scène est une propriété requise." },
          min: {
            args: [1],
            msg: 'Choisissez une scene entre 1 et 5.'
          },
          max: {
            args: [5],
            msg: 'Choisissez une scene entre 1 et 5.'
          }
        }
      },
      musicgenre: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('musicgenre').split(',')
        },
        set(musicgenre) {
            this.setDataValue('musicgenre', musicgenre.join())
        },
        validate: {
            isMusicGenreValid(value) {
              if (!value) {
                throw new Error('Choisissez au moin un genre')
              }
              if (value.split(',').length > 2) {
                throw new Error('Vous ne pouvez pas choisir plus de 2 genres.')
              }
              value.split(',').forEach(type => {
                if (!validMusicGenre.includes(type)) {
                  throw new Error(`Le genre choisi doit appartenir à la liste suivante : ${validMusicGenre}`)
                }
              });
            }
          }
      }
    })
  }