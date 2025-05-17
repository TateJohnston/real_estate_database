const express = require("express");
const router = express.Router();
const biddingClientsController = require("../controllers/biddingClientsController");

router.get("/", (req, res) => {
  biddingClientsController.getBiddingClients(res);
});

router.post("/create", (req, res) => {
  biddingClientsController.createBiddingClient(req.body, res);
});

router.put("/:id", (req, res) => {
  biddingClientsController.updateBiddingClient(req, res);
});

router.delete("/:id", (req, res) => {
  biddingClientsController.deleteBiddingClient(req, res);
});
module.exports = router;
