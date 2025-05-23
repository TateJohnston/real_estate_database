const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class SaleProperties extends Model {}
// Sequelize will create this table if it doesn't exist on startup
SaleProperties.init(
  {
    sale_property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "properties",
        key: "property_id",
      },
    },
    asking_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "sale_properties",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = SaleProperties;
