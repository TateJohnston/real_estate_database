const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router.get("/", (req, res) => {
  clientsController.getClients(res);
});

router.post("/create", (req, res) => {
  clientsController.createClient(req.body, res);
});

router.put("/:id", (req, res) => {
  clientsController.updateClient(req, res);
});

router.delete("/:id", (req, res) => {
  clientsController.deleteClient(req, res);
});
module.exports = router;
