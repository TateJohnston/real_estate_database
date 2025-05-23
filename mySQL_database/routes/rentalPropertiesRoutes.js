const express = require("express");
const router = express.Router();
const rentalPropertiesController = require("../controllers/rentalPropertiesController");

router.get("/", (req, res) => {
  rentalPropertiesController.getRentalProperties(res);
});

router.post("/create", (req, res) => {
  rentalPropertiesController.createRentalProperty(req.body, res);
});

router.put("/:rentalpropertyid", (req, res) => {
  rentalPropertiesController.updateRentalProperty(req, res);
});

router.delete("/:rentalpropertyid", (req, res) => {
  rentalPropertiesController.deleteRentalProperty(req, res);
});

router.get("/fulldata/:rentalpropertyid", (req, res) => {
  rentalPropertiesController.getRentalPropertyData(req, res);
});

module.exports = router;
