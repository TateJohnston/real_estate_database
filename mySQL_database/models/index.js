"use strict";

const Bidders = require("./bidders");
const BiddingClients = require("./biddingClients");
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

async function init() {
  await Realtors.sync();
}
async function init() {
  await Clients.sync();
}
async function init() {
  await Properties.sync();
}
async function init() {
  await PropertyDetails.sync();
}
async function init() {
  await SaleProperties.sync();
}
async function init() {
  await Bidders.sync();
}
async function init() {
  await BiddingClients.sync();
}
async function init() {
  await SaleHistory.sync();
}
async function init() {
  await RentalProperties.sync();
}
async function init() {
  await HeadTenants.sync();
}
async function init() {
  await SubTenants.sync();
}
async function init() {
  await Payments.sync();
}

init();

module.exports = {
  Realtors,
  Clients,
  Properties,
  PropertyDetails,
  SaleProperties,
  Bidders,
  BiddingClients,
  SaleHistory,
  RentalProperties,
  HeadTenants,
  SubTenants,
  Payments,
};
