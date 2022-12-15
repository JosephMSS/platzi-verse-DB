const { DataTypes, Model, Sequelize } = require("sequelize");
const AGENT_TABLE = "agents";
const AgentSchema = {
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  connected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};
class Agent extends Model {
  static associate(models) {
    this.hasMany(models.Metric, { as: "metrics" });
    //models
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: AGENT_TABLE,
      modelName: "Agent",
      timestamps: true,
    };
  }
}
module.exports = { AgentSchema, AGENT_TABLE, Agent };
