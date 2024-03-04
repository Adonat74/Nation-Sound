require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');


// Initialisation de l'application Express
const app = express();

const port = process.env.PORT || 3001; // Définition du port sur lequel l'application écoutera les requêtes


// sert à contrer les attaques DDOS en limitant le nombre de requètes à l'API
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});



// app.use permet "d'attacher" des middleware à notre API
app.use(xss()) // Nettoyage contre les attaques XSS
   .use(mongoSanitize()) // Protection contre l'injection de données MongoDB
   .use(limiter) // Limite des requêtes pour contrer les attaques DDOS
   .use(bodyParser.json())// sert à parser les données transmise à l'API
   .use(cors({origin: (origin, callback) => {
        if ("https://nation-sound-app.onrender.com".indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
},credentials: true})) // Gestion des requêtes CORS
   

// Initialisation de la base de données Sequelize
sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello, Heroku !');
})

// Définition des routes pour les points de terminaison de l'API
require('./src/routes/user/login')(app);
require('./src/routes/user/createUser')(app);
require('./src/routes/user/updateUser')(app);
require('./src/routes/user/deleteUser')(app);

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.';
    res.status(404).json({message});
});



// Démarrage du serveur et écoute des requêtes sur le port spécifié
app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`));