const express = require("express");
const router = express.Router();
const rentalPropertiesController = require("../controllers/rentalPropertiesController");

router.get("/", (req, res) => {
  rentalPropertiesController.getRentalProperties(res);
});

router.post("/create", (req, res) => {
  rentalPropertiesController.createRentalProperty(req.body, res);
});

router.put("/:id", (req, res) => {
  rentalPropertiesController.updateRentalProperty(req, res);
});

router.delete("/:id", (req, res) => {
  rentalPropertiesController.deleteRentalProperty(req, res);
});

router.get("/headtenants", (req, res) => {
  rentalPropertiesController.getAllHeadTenants(req, res);
});

router.get("/subtenants/:headtenantid", (req, res) => {
  rentalPropertiesController.getRentalPropertySubTenants(req, res);
});

router.get("/payments", (req, res) => {
  rentalPropertiesController.getPayments(req, res);
});

router.put("/payments/:rentalpropertyid", (req, res) => {
  rentalPropertiesController.editPayment(req, res);
});

module.exports = router;
