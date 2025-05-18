const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Properties extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Properties.init(
  {
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "client_id",
      },
    },
    realtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "realtors",
        key: "realtor_id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sale_or_lease: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "properties",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Properties;
