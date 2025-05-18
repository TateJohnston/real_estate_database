const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Payments extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Payments.init(
  {
    payment_id: {
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
    monthly_payment_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthly_payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "payments",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Payments;
