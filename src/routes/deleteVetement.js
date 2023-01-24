const { Vetement } = require('../db/sequelize')

// Exportation de tout app entier
module.exports = app => {
    app.delete('/api/vetements/:id', (req, res) => {
        const id = req.params.id
        let VetementToDelete = null
       Vetement.findByPk(id)
               .then(v =>{
            VetementToDelete = v
            if(VetementToDelete === null){
                const message = `La ressource n'est pas disponible`
                res.status(404).json({message})
            }
            // suppression de le vetement
            return Vetement.destroy({
                where: { id: id }
            })
            .then(() =>{
                const message = `Le vetement ${VetementToDelete.name} a été supprimé avec succes`
                res.json({message, data: VetementToDelete})
            })
        })
        .catch(error =>{
            const message = `Le serveur est indisponible`
            res.status(500).json({message, data: error})
        })           
    })
}