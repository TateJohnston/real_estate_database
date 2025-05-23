const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const Properties = require("./properties");
const sequelizeInstance = dbConnect.Sequelize;
class Realtors extends Model {}

Realtors.init(
  {
    realtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    commission: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "realtors",
    timestamps: true,
    freezeTableName: true,
  }
);

Realtors.hasMany(Properties, { foreignKey: "realtor_id" });
module.exports = Realtors;
