"use strict";
const defaults = require("defaults");
const setupDatabase = require("./lib/db");
const setupAgentModel = require("./models/agent");
const setupMetricModel = require("./models/metric");
/**
 *
 * @param {} config es inyectado desde el archivo setup.js
 * @returns retorna el los servicios Agent y Metric
 */
module.exports = async function (config) {
  config = defaults(config, {
    dialect: "sqlite",
    pool: {
      max: 10, //maximo de conexiones
      min: 0, //minimo de conexiones
      idle: 10000, //si no pasa nada en la conexion en 10el la va a dejar de ejecutar
    },
    query: {
      raw: true, // cada una de los query me entregue unicamente el JSON y no objetos complejos
    },
  });
  const sequelize = setupDatabase(config);
  // const AgentModel = setupAgentModel(config);
  const MetricModel = setupMetricModel(config);
  /**
   * Se establecen las relaciones
   * un agente tiene muchos modelos
   * una metrica pertenece a un agente
   */
  // AgentModel.hasMany(MetricModel);
  // MetricModel.belongsTo(AgentModel);
  /**
   * Valida la conexion a la base de datos
   */
  await sequelize.authenticate();
  if (config.setup) {
    /**
     * Si la base de datos existe que cree una nueva
     */
    await sequelize.sync({ force: true });
  }

  const Agent = {};
  const Metric = {};

  return { Agent, Metric };
};
