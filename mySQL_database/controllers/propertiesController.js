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
      res.send({
        result: 200,
        data: data,
        message: "Property created Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createPropertyDetails = (data, res) => {
  Models.PropertyDetails.create(data)
    .then((data) => {
      res.send({
        result: 200,
        data: data,
        message: "Property Details created Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateProperty = async (req, res) => {
  const propertyID = req.params.propertyid;
  const propertyExists = await Models.Properties.findOne({
    where: { property_id: propertyID },
  });

  if (propertyExists) {
    Models.Properties.update(req.body, {
      where: { property_id: propertyID },
      returning: true,
      plain: true,
    })
      .then((data) => {
        res.send({
          result: 200,
          message: `Property with property_id ${propertyID} successfully updated`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Property with property_id ${propertyID} doesn't exist`,
    });
  }
};

const deleteProperty = async (req, res) => {
  const propertyID = req.params.propertyid;
  const propertyExists = await Models.Properties.findOne({
    where: { property_id: propertyID },
  });

  if (propertyExists) {
    Models.Properties.update(req.body, {
      where: { property_id: propertyID },
    });
    Models.Properties.destroy({ where: { property_id: propertyID } })
      .then((data) => {
        res.send({
          result: 200,
          message: `Property with property_id ${propertyID} successfully deleted`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Property with property_id ${propertyID} doesn't exist`,
    });
  }
};

const getPropertyDetails = async (req, res) => {
  const propertyID = req.params.propertyid;
  const propertyExists = await Models.Properties.findOne({
    where: { property_id: propertyID },
  });

  if (propertyExists) {
    const query = `
    SELECT * 
    FROM property_report
    WHERE property_id = ${propertyID}`;
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
  } else {
    res.status(404).send({
      result: 404,
      message: `Property with property_id ${propertyID} doesn't exist`,
    });
  }
};

const getPropertiesByRealtor = async (req, res) => {
  const realtorID = req.params.realtorid;

  const realtorExists = await Models.Realtors.findOne({
    where: { realtor_id: realtorID },
  });

  if (realtorExists) {
    const query = `
    SELECT * 
    FROM property_report
    WHERE realtor_id = ${realtorID}`;
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
  } else {
    res.status(404).send({
      status: 404,
      message: `Realtor with realtor_id ${realtorID} does not exist`,
    });
  }
};

module.exports = {
  getProperties,
  createProperty,
  createPropertyDetails,
  updateProperty,
  deleteProperty,
  getPropertyDetails,
  getPropertiesByRealtor,
};
