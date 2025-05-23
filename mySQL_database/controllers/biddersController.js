"use strict";
const Models = require("../models");

const createSalesPropertyBid = (data, res) => {
  Models.SalePropertyBids.create(data)
    .then((data) => {
      res.send({
        result: 200,
        message: "Bid successfully created",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createBidder = (data, res) => {
  Models.Bidders.create(data)
    .then((data) => {
      res.send({
        result: 200,
        data: data,
        message: "Bidder successfully created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateBid = async (req, res) => {
  const salePropertyId = req.params.salepropertyid;
  const bidderId = req.params.bidderid;

  const salePropertyExists = await Models.SaleProperties.findOne({
    where: { sale_property_id: salePropertyId },
  });

  const bidderExists = await Models.Bidders.findOne({
    where: { bidder_id: bidderId },
  });

  if (salePropertyExists) {
    if (bidderExists) {
      Models.SalePropertyBids.update(req.body, {
        where: { sale_property_id: salePropertyId, bidder_id: bidderId },
        returning: true,
        plain: true,
      })
        .then((data) => {
          res.send({
            result: 200,
            data: data,
            message: "Bid successfully updated",
          });
        })
        .catch((err) => {
          console.log(err);
          res.send({ result: 500, error: err.message });
        });
    } else {
      res.send({
        error: 404,
        message: `Bidder with bidder_id ${bidderId} doesn't exist`,
      });
    }
  } else {
    res.send({
      error: 404,
      message: `Sale property with sale_property_id ${salePropertyId} doesn't exist`,
    });
  }
};

const getSalePropertyBids = async (req, res) => {
  const salePropertyId = req.params.salepropertyid;
  const propertyExists = await Models.SaleProperties.findOne({
    where: { sale_property_id: salePropertyId },
  });

  if (propertyExists) {
    Models.SalePropertyBids.findAll({
      where: { sale_property_id: salePropertyId },
    })
      .then((data) => {
        res.send({ result: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      status: 404,
      message: `Sale property with sale_property_id ${salePropertyId} doesn't exist`,
    });
  }
};

const getAllBidders = (req, res) => {
  Models.Bidders.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteBidder = async (req, res) => {
  const bidderID = req.params.bidderid;
  const bidderExists = await Models.Bidders.findOne({
    where: { bidder_id: bidderID },
  });
  if (bidderExists) {
    Models.Bidders.destroy({
      where: { bidder_id: bidderID },
    })
      .then((data) => {
        res.status(200).send({
          result: 200,
          message: `Successfully deleted ${bidderExists.name} from bidders list`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ result: 500, message: err.message });
      });
  } else {
    res
      .status(404)
      .send({ result: 404, message: `Bidder with bidder_id ${bidderID}` });
  }
};

module.exports = {
  createSalesPropertyBid,
  createBidder,
  getSalePropertyBids,
  getAllBidders,
  updateBid,
  deleteBidder,
};
