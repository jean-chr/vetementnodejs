const { helper } = require('../../helper')
const { Vetement } = require('../db/sequelize')

//exportation de tous app entier
module.exports = app => {
    app.get('/api/vetements/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Vetement.findByPk(id).then(vetements => {
                const message = `Recuperation de le vetement ${id}`
                //gestion erreur metier
                if (vetements === null) {
                    const message = `le vetement a laquelle vous tentez d'acceder n'existe pas`
                    res.status(404).json({ message })
                } else {
                    res.json({ message, data: vetements })
                }
            })
            //gestion erreur technique
            .catch(error => {
                const message = `Serveur non disponible veuillez revenir plus tard`
                res.status(500).json({ message, data: error })
            })
    })
}

