"use strict";
const Models = require("../models");
const { sequelize } = require("../models/bidders");

const createHeadTenant = (data, res) => {
  Models.HeadTenants.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createSubTenant = (data, res) => {
  Models.SubTenants.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateHeadTenant = async (req, res) => {
  const headTenantID = req.params.headtenantid;
  const headTenantExists = await Models.HeadTenants.findOne({
    where: { head_tenant_id: headTenantID },
  });

  if (headTenantExists) {
    Models.HeadTenants.update(req.body, {
      where: { head_tenant_id: req.params.headtenantid },
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
      message: `Head Tenant with head_tenant_id ${headTenantID} does not exist.`,
    });
  }
};

const updateSubTenant = async (req, res) => {
  const subTenantID = req.params.subtenantid;
  const subTenantExists = await Models.SubTenants.findOne({
    where: { sub_tenant_id: subTenantID },
  });

  if (subTenantExists) {
    Models.SubTenants.update(req.body, {
      where: { sub_tenant_id: subTenantID },
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
      message: `Sub tenant with sub_tenant_id ${subTenantID} doesn't exist`,
    });
  }
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

const getAllSubTenants = (req, res) => {
  Models.SubTenants.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getAllHeadTenants,
  createHeadTenant,
  createSubTenant,
  getAllSubTenants,
  updateHeadTenant,
  updateSubTenant,
};
