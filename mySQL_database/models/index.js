"use strict";

const Bidders = require("./bidders");
const SalePropertyBids = require("./salePropertyBids");
const Clients = require("./clients");
const HeadTenants = require("./headTenants");
const Payments = require("./payments");
const Properties = require("./properties");
const PropertyDetails = require("./propertyDetails");
const Realtors = require("./realtors");
const RentalProperties = require("./rentalProperties");
const SaleHistory = require("./saleHistory");
const SaleProperties = require("./saleProperties");
const SubTenants = require("./subTenants");
const EmailList = require("./emailList");

async function init() {
  await Realtors.sync();
  await Clients.sync();
  await Properties.sync();
  await PropertyDetails.sync();
  await SaleProperties.sync();
  await Bidders.sync();
  await SalePropertyBids.sync();
  await SaleHistory.sync();
  await RentalProperties.sync();
  await HeadTenants.sync();
  await SubTenants.sync();
  await Payments.sync();
  await EmailList.sync();
}

init();

module.exports = {
  Realtors,
  Clients,
  Properties,
  PropertyDetails,
  SaleProperties,
  Bidders,
  SalePropertyBids,
  SaleHistory,
  RentalProperties,
  HeadTenants,
  SubTenants,
  Payments,
  EmailList,
};
