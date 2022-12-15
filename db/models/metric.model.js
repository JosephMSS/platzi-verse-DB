const { DataTypes, Model } = require("sequelize");
const METRIC_TABLE = "metrics";
const metricSchema = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};
class Metric extends Model {
  static associate(models) {
    // this.hasMany(models.Metric);
    //models
  }
}
module.exports = { METRIC_TABLE, METRIC_TABLE, Metric };
