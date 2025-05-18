"use strict";
const Models = require("../models");
const { sequelize } = require("../models/bidders");

const getProperties = (res) => {
  const query = `
      SELECT
        realtor_id,
        realtor_name,
        realtor_number,
        realtor_email,
        owner_name,
        owner_email,
        owner_number,
        property_id,
        property_address,
        sale_or_lease,
        property_type,
        bedrooms,
        bathrooms,
        land_size,
        createdAt
      FROM property_info;`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
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
  const propertyId = req.params.propertyid;
  const query = `
  SELECT * 
  FROM property_report
  WHERE property_id = ${propertyId}`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getPropertiesByRealtor = (req, res) => {
  const realtorId = req.params.realtorid;
  const query = `
  SELECT * 
  FROM property_report
  WHERE realtor_id = ${realtorId}`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ result: 200, data: data });
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
  getPropertiesByRealtor,
};
