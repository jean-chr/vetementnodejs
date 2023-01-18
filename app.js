//Chargement du module Http
const express = require("express")
const {helper} = require("./helper.js")
const morgan = require("morgan")
const favicon = require("serve-favicon")
const sequelize = require("./src/db/sequelize")
const bodyParser = require('body-parser')

// creation de l'hote
const hote = "127.0.0.1"

//creation du port
const port = 8000

//initialisation des données
sequelize.initDB();

//creation d'une instnce d'express
const app = express()

//middlewares
app.use(favicon(__dirname+'/fave.jpeg'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use((err, req, res, next) =>{// passer en paramètre un objet response
        const message = `La ressource demandée n'existe pas`
        res.status(404)
           .json({message})
    })

//recupération de tous les vetements
require('./src/routes/findAllVetments.js')(app)

//recupêration d'un seul vetement
require('./src/routes/findVetementByPk.js')(app)

//creation ajout d'un nouveau enregistrement.
require('./src/routes/createVetement.js')(app)

// Mise a jour d'un vetement
require('./src/routes/updateVetement.js')(app)

// suppression  d'un vetement
require('./src/routes/deleteVetement.js')(app)

app.listen(port, hote, ()=>{
    console.log(`server started on ${port} at ${hote}`)
})

module.exports = app
