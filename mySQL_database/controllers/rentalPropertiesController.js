"use strict";
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

const getRentalPropertyData = (req, res) => {
  const rentalPropertyId = req.params.rentalpropertyid;
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
                WHERE rpi.rental_property_id = ${rentalPropertyId}`;

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
      res.send({ status: 200, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: 500, error: err.message });
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
  getRentalPropertyData,
  getRentalPaymentsReport,
  getOverdueRentalPaymentsReport,
};
