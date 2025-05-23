const { DataTypes, Model, INTEGER } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class SaleHistory extends Model {}

SaleHistory.init(
  {
    sale_history_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sale_property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sale_properties",
        key: "sale_property_id",
      },
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    realtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "realtors",
        key: "realtor_id",
      },
    },
    realtor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    realtor_commission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "sale_history",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = SaleHistory;
