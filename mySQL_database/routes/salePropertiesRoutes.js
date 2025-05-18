const express = require("express");
const router = express.Router();
const salePropertiesController = require("../controllers/salePropertiesController");

router.get("/", (req, res) => {
  salePropertiesController.getSalesProperties(res);
});

router.post("/create", (req, res) => {
  salePropertiesController.createSalesProperty(req.body, res);
});

router.put("/:id", (req, res) => {
  salePropertiesController.updateSalesProperty(req, res);
});

router.delete("/:id", (req, res) => {
  salePropertiesController.deleteSalesProperty(req, res);
});

router.get("/bids", (req, res) => {
  salePropertiesController.getAllBids(req, res);
});

router.get("/bids/:salepropertyid", (req, res) => {
  salePropertiesController.getSalePropertyBids(req, res);
});

router.get("/history", (req, res) => {
  salePropertiesController.getSaleHistory(req, res);
});

router.get("/bidders", (req, res) => {
  salePropertiesController.getAllBidders(req, res);
});

module.exports = router;
