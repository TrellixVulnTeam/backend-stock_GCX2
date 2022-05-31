const Sequelize = require('sequelize');
const database = require('../config/db');

const Produto = database.define('produto', {
    //define function creates table schema
    //Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // categoria: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
}, {
    // Other model options go here
});

module.exports = Produto;

