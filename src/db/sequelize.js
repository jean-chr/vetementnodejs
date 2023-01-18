const { Sequelize, DataTypes } = require("sequelize")
const vetements = require("./vetementData")

const VetementModel = require('../models/vetement')
//configuration sequelize
const sequelize = new Sequelize(
    'vetement', // nom de la base de donnée
    'root', // nom d'utilisateur de la BD
    '', // mot de passe du user de la BD
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            timezone: '+00:00'
        },
        logging: false
    }
)

//initialisation du modele
const Vetement = VetementModel(sequelize,DataTypes)

//sync et preremplissage de la BD
const initDB = ()=> {
    return sequelize.sync({force: true})
    .then(
        ()=>
        {
            console.log('synchronisation OK')
            vetements.map(v =>{
                Vetement.create({
                    id: v.id,
                    libellet: v.libellet,
                    couleur: v.couleur,
                    prix: v.prix,
                    images:v.images,
                }).then(res => console.log(res.toJSON()))
                .catch(err => console.log('echec d insertion' + err))
            })
        }
    ) .catch(error => console.error('synchronisation echoué:' + error))
                    
}

module.exports = {Vetement, initDB}
