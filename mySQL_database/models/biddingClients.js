const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class BiddingClients extends Model {}
// Sequelize will create this table if it doesn't exist on startup
BiddingClients.init(
  {
    bidding_client_id: {
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
    bidder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bidders",
        key: "bidder_id",
      },
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "bidding_clients",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = BiddingClients;
