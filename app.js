const express = require('express');
const morgan = require('morgan');// permet de loguer les donées des requêtes http dans le terminal de vs code (à installer)
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const jwt = require('jsonwebtoken')



const app = express();
const port = 3000;






// app.use permet "d'attacher" des middleware à notre API
app.use(morgan('dev'))// middleware servant de loguer les données des requêtes http
   .use(bodyParser.json())// sert à parser les données transmise à l'API
   

   
sequelize.initDb()   



// Ici nous placerons nos futurs points de terminaison.

require('./src/routes/user/login')(app)
require('./src/routes/user/createUser')(app)
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
});




app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`));