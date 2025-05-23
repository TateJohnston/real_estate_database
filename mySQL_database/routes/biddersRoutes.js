"use strict";
const express = require("express");
const router = express.Router();
const biddersController = require("../controllers/biddersController");

router.get("/", (req, res) => {
  biddersController.getAllBidders(req, res);
});

router.put("/bids/:salepropertyid/:bidderid", (req, res) => {
  biddersController.updateBid(req, res);
});
router.post("/bidders/create", (req, res) => {
  biddersController.createBidder(req.body, res);
});
router.post("/bids/create", (req, res) => {
  biddersController.createSalesPropertyBid(req.body, res);
});
router.get("/bids/:salepropertyid", (req, res) => {
  biddersController.getSalePropertyBids(req, res);
});
router.delete("/delete/:bidderid", (req, res) => {
  biddersController.deleteBidder(req, res);
});
module.exports = router;
