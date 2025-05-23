"use strict";
const Models = require("../models");
const { post } = require("../routes/clientsRoutes");

const getClients = (req, res) => {
  Models.Clients.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createClient = (data, res) => {
  Models.Clients.create(data)
    .then((data) => {
      res.send({ result: 200, message: "Client created Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateClient = async (req, res) => {
  const clientID = req.params.clientid;
  const clientExists = await Models.Clients.findOne({
    where: { client_id: clientID },
  });

  if (clientExists) {
    Models.Clients.update(req.body, {
      where: { client_id: req.params.id },
      returning: true,
      plain: true,
    })
      .then((data) => {
        res.send({
          result: 200,
          message: `Updated ${clientExists.name}'s details`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Client with client_id ${clientID} doesn't exist`,
    });
  }
};

const deleteClient = async (req, res) => {
  const clientID = req.params.clientid;
  const clientExists = await Models.Clients.findOne({
    where: { client_id: clientID },
  });

  if (clientExists) {
    Models.Clients.destroy({
      where: { id: req.params.id },
    })
      .then((data) => {
        res.send({
          result: 200,
          message: `Successfully Deleted ${clientExists.name} from Client List`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  } else {
    res.status(404).send({
      result: 404,
      message: `Client with client_id ${clientID} doesn't exist`,
    });
  }
};

const getEmailList = (req, res) => {
  Models.EmailList.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

const subscribeEmailList = async (req, res) => {
  const postData = req.body;
  const postDataEmail = postData.email;

  try {
    const emailExists = await Models.EmailList.findOne({
      where: { email: postDataEmail },
    });

    if (!emailExists) {
      Models.EmailList.create(postData)
        .then((data) => {
          res.send({ result: 200, data: data });
        })
        .catch((err) => {
          res.status(500).send({ result: 500, error: err.message });
        });
    } else {
      res
        .status(404)
        .send({ result: 404, message: `Already subscribed to mailing list` });
    }
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

const unsubscibeEmailList = async (req, res) => {
  const email = req.query.email;
  try {
    const emailExists = await Models.EmailList.findOne({
      where: { email: email },
    });

    if (!emailExists) {
      return res
        .status(404)
        .send({ result: 404, message: `Email isn't in mailing list` });
    } else {
      Models.EmailList.destroy({
        where: { email: email },
      })
        .then((data) => {
          res.send({
            result: 200,
            data: data,
            message: `${email} unsubscribed from mailing list`,
          });
        })
        .catch((err) => {
          res.status(500).send({ result: 500, error: err.message });
        });
    }
  } catch (err) {
    res.status(500).send({ result: 500, error: err.message });
  }
};

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getEmailList,
  subscribeEmailList,
  unsubscibeEmailList,
};
