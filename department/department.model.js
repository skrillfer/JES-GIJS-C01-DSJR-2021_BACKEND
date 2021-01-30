const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING , allowNull: false},
        countryId: { type: DataTypes.INTEGER, allowNull: false}  
    };
    const options = {
        timestamps: false
    };

    return sequelize.define('department', attributes, options);
}