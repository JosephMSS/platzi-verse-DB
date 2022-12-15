/**
 @typedef {Object} config
 * @property {String} URI,
 * @property {String} engine
 * @property {Boolean} logging
 * @property {Sequelize} Sequelize
 */
/**
 * @param {config} config
 */
function setupDatabase({ URI, engine, logging, Sequelize }) {
  const sequelize = new Sequelize(URI, {
    dialect: `${engine}`,
    logging,
  });
  return sequelize;
}
/**
 * @typedef {Object} connectionResponse
 * @property {Boolean} hasConnection
 * @property {String} message
 */

/**
 * @param {connectionResponse} validationData
 * @returns {connectionResponse} connectionResponse
 */
function connectionResponse({
  hasConnection = false,
  message = "Default message",
}) {
  return { hasConnection, message };
}
/**
 *
 * @param {Sequelize} sequelize
 * @returns {connectionResponse}
 */
const validateConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    return connectionResponse({
      hasConnection: true,
      message: "Connection has been established successfully.",
    });
  } catch (error) {
    return connectionResponse({
      hasConnection: false,
      message: `Unable to connect to the database: ${error}`,
    });
  }
};
module.exports = { connectionResponse, setupDatabase, validateConnection };
