const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user.js');
const config = require('../credentials/dbConfig.js');


 
// variable contenant la base de donnée et les tables
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: 3306,
  logging: console.log,
  dialect: 'mariadb'
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