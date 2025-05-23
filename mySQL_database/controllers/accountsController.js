"use strict";
const Models = require("../models");
const { sequelize, create } = require("../models/bidders");

const fortnightlyReport = (req, res) => {
  const query = `
    SELECT
        *,
        SUM(fortnightly_salary + fortnightly_commission) as fortnightly_total
    FROM accounts_info
    GROUP BY realtor_id
`;

  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ status: 200, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: 500, error: err.message });
    });
};

const getRentalPaymentsReport = (req, res) => {
  const query = "SELECT * FROM rental_payments_report";
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      res.send({ status: 200, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: 500, error: err.message });
    });
};

const getOverdueRentalPaymentsReport = (req, res) => {
  const query = `SELECT * FROM rental_payments_report WHERE paid_status = false`;
  sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      if (data.length > 0) {
        res.send({ status: 200, result: data });
      } else {
        res.send({ status: 404, message: "No overdue payments" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: 500, error: err.message });
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

const editPayment = async (req, res) => {
  const rentalPropertyId = req.params.rentalpropertyid;

  const targetProperty = await Models.RentalProperties.findOne({
    where: { rental_property_id: rentalPropertyId },
  });

  if (targetProperty) {
    Models.Payments.update(req.body, {
      where: { rental_property_id: rentalPropertyId },
      returning: true,
      plain: true,
    })
      .then((data) => {
        res.send({ status: 200, data: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.send({
      status: 404,
      message: `No rental property matching rental_property_id ${rentalPropertyId} exists`,
    });
  }
};

const createPayment = (data, res) => {
  Models.Payments.create(data)
    .then((data) => {
      res.send({
        result: 200,
        data: data,
        message: "Payment Successfully Created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  fortnightlyReport,
  getRentalPaymentsReport,
  getOverdueRentalPaymentsReport,
  getPayments,
  editPayment,
  createPayment,
};
