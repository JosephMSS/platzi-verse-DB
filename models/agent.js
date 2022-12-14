const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
/**
 * forma vieja de crear los modelos 
 * IMPORTANT: podemos crearlos como  el curso de backend con postgre sql
 * @param {} config 
 * @returns 
 */
module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('agent', {
    uuid: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    hostname: { type: Sequelize.STRING, allowNull: false },
    pid: { type: Sequelize.INTEGER, allowNull: false },
    connected: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
