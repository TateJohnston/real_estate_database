"use strict";
const Models = require("../models");

const getSalesProperties = (res) => {
  Models.SaleProperties.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createSalesProperty = (data, res) => {
  Models.SaleProperties.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateSalesProperty = (req, res) => {
  Models.SaleProperties.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteSalesProperty = (req, res) => {
  Models.SaleProperties.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getAllBids = (req, res) => {
  Models.SalePropertyBids.findAll({})
    .then((data) => {
      res.status(200).send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, message: err.message });
    });
};

const getSalePropertyBids = (req, res) => {
  const salePropertyId = req.params.salepropertyid;
  Models.SalePropertyBids.findByPk(salePropertyId)
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res
          .status(404)
          .send({ result: 404, message: "Sale Property not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getSaleHistory = (req, res) => {
  Models.SaleHistory.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
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

module.exports = {
  getSalesProperties,
  createSalesProperty,
  updateSalesProperty,
  deleteSalesProperty,
  getSalePropertyBids,
  getAllBids,
  getSaleHistory,
  getAllBidders,
};
// ++ Test updating and deleting a user using Postman
