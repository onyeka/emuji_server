const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    define: {
      timestamps: false,
      freezeTableName: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
)
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  const models = {
    Emuji: sequelize.import('./emuji')
  }
  const test = async () => console.log('!!!! Get all! ', await models.Emuji.findAll())

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {
  connection: sequelize,
  emuji: models.Emuji
}