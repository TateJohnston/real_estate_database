"use strict";
const Models = require("../models");

const getProperties = (res) => {
  Models.Properties.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createProperty = (data, res) => {
  Models.Properties.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateProperty = (req, res) => {
  Models.Properties.update(req.body, {
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

const deleteProperty = (req, res) => {
  Models.Properties.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getPropertyDetails = (req, res) => {
  const propertyId = req.params.propertyId;
  Models.PropertyDetails.findByPk(propertyId)
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.status(404).send({ result: 404, message: "Property not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetails,
};
