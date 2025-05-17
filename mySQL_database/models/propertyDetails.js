const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class PropertyDetails extends Model {}
// Sequelize will create this table if it doesn't exist on startup
PropertyDetails.init(
  {
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "properties",
        key: "property_id",
      },
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    land_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "property_details",
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = PropertyDetails;
