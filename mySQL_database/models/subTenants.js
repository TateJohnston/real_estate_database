const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class SubTenants extends Model {}
// Sequelize will create this table if it doesn't exist on startup
SubTenants.init(
  {
    sub_tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    head_tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "head_tenants",
        key: "head_tenant_id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "sub_tenants",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = SubTenants;
