// creation de la constante
const express = require('express');

// Affichage console
const chalk = require('chalk');

// Access au donnees
let bodyParser = require('body-parser');

// Erreur d'adresse
const http404 = require('./middleware/route404');

// Access au chemin
const path = require('path');

// Constante de connexion  : utile pour le débug
const morgan = require('morgan');

// Ajout d'un logging
const {loggers, transports, format} = require("winston");

// Acces a MongoDB
const mongoose = require('mongoose');

// Creation de l'application
const app = express();

// Recuperation donnee formulaire
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(bodyParser.json());

// utilisation du logging  : affiche toutes les actions faites dans la console
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Defini des loggers de winston
loggers.add('infoLogger', {
    level: 'info',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/info.log')})],
    format: format.printf((info) => {
        let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
        return message
    })
});
loggers.add('errorLogger', {
    level: 'error',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/error.log')})],
    format: format.printf((info) => {
        let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
        return message
    })
});
const infoLogger = loggers.get('infoLogger');

// Connection a mongodb
const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/pizza', {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(chalk.green(`Connected to database`))
            infoLogger.info("Connected to database");
        },
        error => {
            console.error(chalk.red(`Connection error: ${error.stack}`))
            process.exit(1)
        }
    )
}
connectDb().catch(error => console.error(error))

// Creation d'une route
const pizzaRoutes = require('./routes/pizza');

// Acces aux routes
app.use('/api/v1/', pizzaRoutes);

// Si mauvaise route
app.use(http404.notFound);

// Ecoute sur le port 3000
app.listen(3000, () => {
    //Ajout des infos du logger
    infoLogger.info('Server is running on port: 3000');
});

// Affichage de verification
console.log(chalk.green("Server is running on port: 3000"));