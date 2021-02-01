const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING , allowNull: false},
        description: { type: DataTypes.STRING , allowNull: false},
        address: { type: DataTypes.STRING , allowNull: false},
        tel:{ type: DataTypes.STRING , allowNull: false},
        createdAt: { type: DataTypes.DATE , allowNull: true},
        updatedAt: { type: DataTypes.DATE , allowNull: true}
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('prosecution', attributes, options);
}