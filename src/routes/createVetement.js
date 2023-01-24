const { ValidationError } = require('sequelize')
const {Vetement} = require('../db/sequelize')

//exportation de tous app entier

module.exports = app => {
    app.post('/api/vetements', (req, res) =>{
        Vetement.create(req.body)
                .then(vetements =>{
                    const message = ` vetement  ${req.body.name} a été enregistré avec succès`
                    res.json({message, data : vetements})
                })
                .catch(error =>{
                    // verifier si l'erreur est une instance de ValidationError
                    if(error instanceof ValidationError){
                        return res.status(400).json( { message: error.message, data: error } )
                    }
                    const message = `L'ajout du vetement n'a pas pu etre effectué`
                    res.status(500).json( { message, data: error } )
                })
    })
}

