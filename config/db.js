// connection to DB
const Sequelize = require('sequelize');
const sequelize = new Sequelize("controle-estoque", "user", "password", {
  // The `host` parameter is required for other databases
  dialect: 'sqlite',
  storage: 'database/database.sqlite'
})

// const testingConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// testingConnection();


module.exports = sequelize;




