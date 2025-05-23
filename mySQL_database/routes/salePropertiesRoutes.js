const express = require("express");
const router = express.Router();
const salePropertiesController = require("../controllers/salePropertiesController");

router.post("/create", (req, res) => {
  salePropertiesController.createSalesProperty(req.body, res);
});

router.get("/", (req, res) => {
  salePropertiesController.getSalesProperties(req, res);
});

router.put("/:salepropertyid", (req, res) => {
  salePropertiesController.updateSalesProperty(req, res);
});

router.get("/history", (req, res) => {
  salePropertiesController.getSaleHistory(req, res);
});

router.get("/website/:salepropertyid", (req, res) => {
  salePropertiesController.websiteDisplay(req, res);
});

router.put("/propertysold/:salepropertyid", (req, res) => {
  salePropertiesController.updateToSold(req, res);
});

router.get("/report", (req, res) => {
  salePropertiesController.salePropertiesReport(req, res);
});

module.exports = router;
