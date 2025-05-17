const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class RentalProperties extends Model {}
// Sequelize will create this table if it doesn't exist on startup
RentalProperties.init(
  {
    rental_property_id: {
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
    lease_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lease_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "rental_properties",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = RentalProperties;
