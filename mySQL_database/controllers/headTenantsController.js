"use strict";
const Models = require("../models");

const getHeadTenants = (res) => {
  Models.HeadTenants.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

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

const updateHeadTenant = (req, res) => {
  Models.HeadTenants.update(req.body, {
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

const deleteHeadTenant = (req, res) => {
  Models.HeadTenants.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  getHeadTenants,
  createHeadTenant,
  updateHeadTenant,
  deleteHeadTenant,
};
// ++ Test updating and deleting a user using Postman
