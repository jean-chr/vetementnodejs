const { Vetement } = require('../db/sequelize')

// Exportation de tout app entier
module.exports = app => {
    app.put('/api/vetements/:id', (req, res) => {
        const id = req.params.id
        Vetement.update(req.body, {
            where:{ id: id }
        })
        .then(() =>{
            return Vetement.findByPk(id)
            .then(vetement =>{
                // verification de l'existance de la vetement ayant cet id
                if(vetement === null){
                    const message = `La vetement avec l'id ${id} n'existe pas!!. Request aborted`
                    res.status(404).json({message})
                }
                const message= `la vetement ${vetement.name} à été modifier avec succès`
                res.json({message, data: vetement})
            })
        })
        // erreur technique
        .catch(error =>{
            // verifier si l'erreur est une instance de ValidationError
            if(error instanceof ValidationError){
                return res.status(400).json( { message: error.message, data: error } )
            }
            const message = `Serveur non disponible veuillez revenir plus tard`
            res.status(500).json({message, data: error})
        })
    })
}