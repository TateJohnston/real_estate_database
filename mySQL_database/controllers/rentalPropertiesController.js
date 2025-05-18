"use strict";
const Models = require("../models");
const { head } = require("../routes/rentalPropertiesRoutes");

const getRentalProperties = (res) => {
  Models.RentalProperties.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createRentalProperty = (data, res) => {
  Models.RentalProperties.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateRentalProperty = (req, res) => {
  Models.RentalProperties.update(req.body, {
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

const deleteRentalProperty = (req, res) => {
  Models.RentalProperties.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getAllHeadTenants = (req, res) => {
  Models.HeadTenants.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, error: err.message });
    });
};

const getRentalPropertySubTenants = (req, res) => {
  const headTenantId = req.params.headtenantid;
  Models.SubTenants.findAll({
    where: { head_tenant_id: headTenantId },
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getPayments = (req, res) => {
  Models.Payments.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const editPayment = (req, res) => {
  const rentalPropertyId = req.params.rentalpropertyid;
  Models.Payments.update(req.body, {
    where: { rental_property_id: rentalPropertyId },
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getRentalProperties,
  createRentalProperty,
  updateRentalProperty,
  deleteRentalProperty,
  getAllHeadTenants,
  getRentalPropertySubTenants,
  getPayments,
  editPayment,
};
// ++ Test updating and deleting a user using Postman
