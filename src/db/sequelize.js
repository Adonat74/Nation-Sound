const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user.js');
// const config = require('../credentials/dbConfig.js');


 
// variable contenant la base de donnée et les tables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
});






// variable contenant une instance de table avec les colonnes et leurs type de données
const User = UserModel(sequelize, DataTypes);


//Initialise/synchronise la table user au démarrage de l'application avec les données ce trouvant dans user.js
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {

    console.log('La base de donnée a bien été initialisée !');
  });
}


// export de initDB vers le point d'entrée, app.js
// export de la variable User contenant la table vers les routes
module.exports = { 
  initDb, User
}