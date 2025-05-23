const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class SalePropertyBids extends Model {}
// Sequelize will create this table if it doesn't exist on startup
SalePropertyBids.init(
  {
    sale_property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "sale_properties",
        key: "sale_property_id",
      },
    },
    bidder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "bidders",
        key: "bidder_id",
      },
      onDelete: "CASCADE",
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "sale_property_bids",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = SalePropertyBids;
