const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const SubTenants = require("./subTenants");
const sequelizeInstance = dbConnect.Sequelize;
class HeadTenants extends Model {}

// Sequelize will create this table if it doesn't exist on startup
HeadTenants.init(
  {
    head_tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rental_property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rental_properties",
        key: "rental_property_id",
      },
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
  },
  {
    sequelize: sequelizeInstance,
    modelName: "head_tenants",
    timestamps: true,
    freezeTableName: true,
  }
);

HeadTenants.hasMany(SubTenants, { foreignKey: "head_tenant_id" });
module.exports = HeadTenants;
