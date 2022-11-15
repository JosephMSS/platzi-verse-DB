'use strict'
const Sequelize = require('sequelize')
let sequelize = null
/**
 * Crear una nueva instancia en caso de que no exista y en caso de que si la retorna(Singleton)
 * @param {*} config 
 * @returns 
 */
module.exports = function setupDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
