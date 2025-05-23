"use strict";
const { default: axios } = require("axios");
const Models = require("../models");
const { sequelize } = require("../models/bidders");

const getSalesProperties = (req, res) => {
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

const updateSalesProperty = async (req, res) => {
  const salePropertyID = req.params.salepropertyid;
  const salePropertyExists = await Models.SaleProperties.findOne({
    where: { sale_property_id: salePropertyID },
  });

  if (salePropertyExists) {
    Models.SaleProperties.update(req.body, {
      where: { sale_property_id: salePropertyID },
      returning: true,
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
      message: `Sale property with sale_property_id ${salePropertyID} doesn't exist`,
    });
  }
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

const websiteDisplay = async (req, res) => {
  const salePropertyID = req.params.salepropertyid;
  const salePropertyExists = await Models.SaleProperties.findOne({
    where: { sale_property_id: salePropertyID },
  });

  if (salePropertyExists) {
    const query = `
  SELECT
	  sale_property_id,
	  realtor_name,
    realtor_email,
    realtor_number,
    property_type,
    bedrooms,
    bathrooms,
    land_size,
    asking_price,
    sale_status
  FROM sale_property_info
  WHERE sale_property_id =  ${salePropertyID}`;

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
  } else {
    res.status(404).send({
      result: 404,
      message: `Sale property with sale_property_id ${salePropertyID} doesn't exist.`,
    });
  }
};

const updateToSold = async (req, res) => {
  const salePropertyID = req.params.salepropertyid;
  const salePropertyExists = await Models.SaleProperties.findOne({
    where: { sale_property_id: salePropertyID },
  });
  if (salePropertyExists) {
    Models.SaleProperties.update(
      { sale_status: "Sold" },
      {
        where: { sale_property_id: salePropertyID },
        returning: true,
      }
    )
      .then((data) => {
        res.send({ result: 200, data: data });
        moveToSaleHistory(salePropertyID);
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Sale property with sale_property_id ${salePropertyID} doesn't exist.`,
    });
  }
};

const moveToSaleHistory = async (salePropertyID) => {
  let exists = false;
  await Models.SaleHistory.findOne({
    where: {
      sale_property_id: salePropertyID,
    },
  })
    .then((data) => {
      if (data) exists = true;
    })
    .catch((err) => {
      console.log(err);
    });

  if (!exists) {
    const query = `
  INSERT INTO sale_history
  (
    sale_property_id,
    sale_price,
    realtor_id,
    realtor_name,
    realtor_commission,
    createdAt,
    updatedAt
  )
  SELECT 
    sale_property_id,
    highest_bid,
    realtor_id,
    realtor_name,
    realtor_commission / 100 * highest_bid,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  FROM sale_property_info 
  WHERE sale_status = 'Sold'
  AND sale_property_id = ${salePropertyID}`;

    try {
      await sequelize.query(query);
      console.log("Successfully moved to sale history");
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Sale Property already exists in sale history");
  }
};

const salePropertiesReport = (req, res) => {
  const query = `
  SELECT
	  spi.sale_property_id as sale_property_id,
    spi.realtor_name as realtor_name,
    pi.owner_name as owner_name,
	  pi.property_address as property_address,
    pi.bedrooms as bedrooms,
    pi.bathrooms as bathrooms,
    pi.property_type as property_type,
    pi.land_size as land_size,
    to_market_date,
    sale_status,
    days_on_market,
    asking_price,
    highest_bid,
    COUNT(bid) as total_bids_count
  FROM sale_property_info spi
  JOIN property_info pi  ON spi.property_id = pi.property_id
  JOIN bidding_info bi ON spi.sale_property_id = bi.sale_property_id
  GROUP BY spi.sale_property_id`;

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
  getSalesProperties,
  createSalesProperty,
  updateSalesProperty,
  getSaleHistory,
  websiteDisplay,
  updateToSold,
  moveToSaleHistory,
  getSaleHistory,
  salePropertiesReport,
};
// ++ Test updating and deleting a user using Postman
