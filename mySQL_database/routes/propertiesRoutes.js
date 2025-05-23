const express = require("express");
const router = express.Router();
const propertiesController = require("../controllers/propertiesController");

router.get("/", (req, res) => {
  propertiesController.getProperties(res);
});

router.post("/create", (req, res) => {
  propertiesController.createProperty(req.body, res);
});

router.post("/details/create", (req, res) => {
  propertiesController.createPropertyDetails(req.body, res);
});

router.put("/:propertyid", (req, res) => {
  propertiesController.updateProperty(req, res);
});

router.delete("/:propertyid", (req, res) => {
  propertiesController.deleteProperty(req, res);
});

router.get("/:propertyid", (req, res) => {
  propertiesController.getPropertyDetails(req, res);
});

router.get("/realtors/:realtorid", (req, res) => {
  propertiesController.getPropertiesByRealtor(req, res);
});

module.exports = router;
