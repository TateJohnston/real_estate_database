"use strict";
const { default: axios } = require("axios");
const Models = require("../models");
const { sequelize } = require("../models/bidders");

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

const updateRentalProperty = async (req, res) => {
  const rentalPropertyID = req.params.rentalpropertyid;
  const rentalPropertyExists = await Models.RentalProperties.findOne({
    where: { rental_property_id: rentalPropertyID },
  });
  if (rentalPropertyExists) {
    Models.RentalProperties.update(req.body, {
      where: { rental_property_id: req.params.rentalpropertyid },
      returning: true,
      plain: true,
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
      message: `Rental property with rental_property_id ${rentalPropertyID} doesn't exist`,
    });
  }
};

const deleteRentalProperty = async (req, res) => {
  const rentalPropertyID = req.params.rentalpropertyid;
  const rentalPropertyExists = await Models.RentalProperties.findOne({
    where: { rental_property_id: rentalPropertyID },
  });
  if (rentalPropertyExists) {
    Models.RentalProperties.destroy({
      where: { rental_property_id: rentalPropertyID },
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
      message: `Rental property with rental_property_id ${rentalPropertyID} doesn't exist`,
    });
  }
};

const getRentalPropertyData = async (req, res) => {
  const rentalPropertyID = req.params.rentalpropertyid;
  const rentalPropertyExists = await Models.RentalProperties.findOne({
    where: { rental_property_id: rentalPropertyID },
  });

  if (rentalPropertyExists) {
    const headTenant = await Models.HeadTenants.findOne({
      where: { rental_property_id: rentalPropertyID },
    });

    if (!headTenant) {
      return res.status(404).send({
        result: 404,
        message: `No head tenant found for rental_property_id ${rentalPropertyID}`,
      });
    }
    const subTenants = await Models.SubTenants.findAll({
      where: { head_tenant_id: headTenant.head_tenant_id },
    });

    try {
      const query = `
                  SELECT
                    rpi.rental_property_id as rental_property_id,
                    pi.property_id as property_id,
                    realtor_name,
                    owner_name,
                    owner_number,
                    owner_email,
                    property_address,
                    lease_start_date,
                    lease_end_date,
                    monthly_payment_day,
                    monthly_payment_amount,
                    paid_status,
                    head_tenant_id,
                    head_tenant_name,
                    head_tenant_email,
                    head_tenant_number
                FROM rental_property_info rpi
                JOIN property_info pi ON rpi.property_id = pi.property_id
                JOIN payment_info payi ON rpi.rental_property_id = payi.rental_property_id
                WHERE rpi.rental_property_id = ${rentalPropertyID}`;

      const propertyReport = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      const fullReport = { ...propertyReport[0], subTenants };

      res.send({ status: 200, result: fullReport });
    } catch (err) {
      console.log(err);
      res.send({ status: 500, error: err.message });
    }
  } else {
    res.status(404).send({
      result: 404,
      message: `Rental property with rental_property_id ${rentalPropertyID} doesn't exist`,
    });
  }
};

module.exports = {
  getRentalProperties,
  createRentalProperty,

  updateRentalProperty,
  deleteRentalProperty,

  getRentalPropertyData,
};
