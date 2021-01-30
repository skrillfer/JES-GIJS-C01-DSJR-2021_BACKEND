const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING , allowNull: false},
        departmentId: {type: DataTypes.INTEGER, allowNull: false }
    };
        
    const options = {
        timestamps: false
    };

    return sequelize.define('town', attributes, options);
}