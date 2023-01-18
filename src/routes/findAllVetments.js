const { helper } = require('../../helper')
const { Vetement } = require('../db/sequelize')

// Exportation de tout app entier
module.exports = app => {
    app.get('/api/vetements', (req, res) => {
        Vetement.findAll()
               .then(vetements => {
                    const message = 'liste des vetements'
                    res.json({message, data: vetements})
               })
               .catch(error =>{
                const message = 'serveur non disponible'
                res.status(500).json({message, data : error})
               })
    })
}