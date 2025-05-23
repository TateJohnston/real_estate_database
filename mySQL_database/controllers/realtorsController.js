"use strict";
const Models = require("../models");

const getRealtors = (res) => {
  Models.Realtors.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createRealtor = (data, res) => {
  Models.Realtors.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateRealtor = async (req, res) => {
  const realtorID = req.params.realtorid;

  const realtorExists = await Models.Realtors.findOne({
    where: { realtor_id: realtorID },
  });

  if (realtorExists) {
    Models.Realtors.update(req.body, {
      where: { realtor_id: realtorID },
      returning: true,
      plain: true,
    })
      .then((data) => {
        res.send({
          result: 200,
          data: data,
          message: `Realtor with realtor_id ${realtorID} has been updated.`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Realtor with realtor_id ${realtorID} does not exist.`,
    });
  }
};

const deleteRealtor = async (req, res) => {
  const realtorID = req.params.realtorid;
  const realtorExists = await Models.Realtors.findOne({
    where: { realtor_id: realtorID },
  });

  if (realtorExists) {
    Models.Realtors.destroy({
      where: { realtor_id: req.params.id },
    })
      .then((data) => {
        res.send({
          result: 200,
          data: data,
          message: `Realtor with realtor_id ${realtorID} has been deleted.`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Reator with realtor_id ${realtorID} does not exist.`,
    });
  }
};
const getRealtorById = (req, res) => {
  const realtorID = req.params.realtorid;
  Models.Realtors.findOne({
    where: { realtor_id: realtorID },
  })
    .then((data) => {
      if (data) {
        res.send({ result: 200, data: data });
      } else {
        res.status(404).send({
          result: 404,
          message: `Realtor with realtor_id ${realtorID} doesn't exist.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: 500, message: err.message });
    });
};

module.exports = {
  getRealtors,
  createRealtor,
  updateRealtor,
  deleteRealtor,
  getRealtorById,
};
