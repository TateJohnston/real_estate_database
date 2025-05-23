const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router.get("/", (req, res) => {
  clientsController.getClients(res);
});

router.post("/create", (req, res) => {
  clientsController.createClient(req.body, res);
});

router.put("/:clientid", (req, res) => {
  clientsController.updateClient(req, res);
});

router.delete("/:clientid", (req, res) => {
  clientsController.deleteClient(req, res);
});

router.get("/mailinglist", (req, res) => {
  clientsController.getEmailList(req, res);
});

router.post("/mailinglist/subscribe", (req, res) => {
  clientsController.subscribeEmailList(req, res);
});

router.delete("/mailinglist/unsubscribe", (req, res) => {
  clientsController.unsubscibeEmailList(req, res);
});
module.exports = router;
