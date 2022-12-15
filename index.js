const { Sequelize } = require("sequelize");
const { setupModels } = require("./db/models");
const {
  config: {
    db: { user, password, engine, host, name, port },
  },
} = require("./config");
const { setupDatabase, validateConnection } = require("./libs/sequelize");
const USER = encodeURIComponent(user);
const PASSWORD = encodeURIComponent(password);
const URI = `${engine}://${USER}:${PASSWORD}@${host}:${port}/${name}`;
/**
 * @typedef {Object} config
 * @property {String} URI,
 * @property {String} engine
 * @property {Boolean} logging
 * @property {Sequelize} Sequelize
 */
/**
 * @type {config}
 */
const defaultConfig = {
  URI,
  engine,
  logging,
  Sequelize,
};
/**
 *
 * @param {config} config Configuración de la base de datos relacional que se va a utilizar
 * @returns {Object} retorna el servicio de agente y métrica
 */
async function setupService(config = defaultConfig) {
  const sequelize = setupDatabase(config);
  const { hasConnection, message } = validateConnection(sequelize);
  try {
    if (!hasConnection) {
      throw message;
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return {};
}
module.exports = { setupService };
