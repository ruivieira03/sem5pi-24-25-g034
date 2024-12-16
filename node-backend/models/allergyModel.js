const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Allergy = sequelize.define(
    'Allergy',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
        tableName: 'allergies', // MySQL table name
    }
);

module.exports = Allergy;
