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
    bidding_client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bidding_clients",
        key: "bidding_client_id",
      },
    },
    sale_price: {
      type: DataTypes.INTEGER,
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
