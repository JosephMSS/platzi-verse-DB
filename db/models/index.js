const { Agent, AgentSchema } = require("./agent.model.js");
// const { User, UserSchema } = require("./metric.model");

/**
 * Se encarga de enviar la conexion a los modelos
 * @param sequelize conexion a la base de datos
 */
function setupModels(sequelize) {
  // User.init(UserSchema, User.config(sequelize));
  Agent.init(AgentSchema,Agent.config)
  /**
   * Luego de ejecutar los inits vamos a generar las asociaciones

   */
  // User.associate(sequelize.models);
}
module.exports = { setupModels };
