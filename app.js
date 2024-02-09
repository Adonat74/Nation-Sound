const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
const rateLimit = require('express-rate-limit');




const app = express();
const port = 3001;


// sert à contrer les attaques DDOS en limitant le nombre de requètes à l'API
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});



// app.use permet "d'attacher" des middleware à notre API
app.use(limiter)
   .use(bodyParser.json())// sert à parser les données transmise à l'API
   .use(cors({origin: true, credentials: true}))
   

   
sequelize.initDb();


// Ici nous placerons nos futurs points de terminaison.

require('./src/routes/user/login')(app);
require('./src/routes/user/createUser')(app);
require('./src/routes/user/updateUser')(app);
require('./src/routes/user/deleteUser')(app);

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message});
});




app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`));