
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vetement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libellet: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        couleur: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Ce champ est requis" }
            }
        },
        prix: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: { msg: "Vous devez envoyer un nombre réel" },
                notNull: { msg: "Ce champ est requis" }
            }
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: "Ce champ est requis" }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}