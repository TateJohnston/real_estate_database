const express = require("express");
const router = express.Router();
const propertiesController = require("../controllers/propertiesController");

router.get("/", (req, res) => {
  propertiesController.getProperties(res);
});

router.post("/create", (req, res) => {
  propertiesController.createProperty(req.body, res);
});

router.put("/:id", (req, res) => {
  propertiesController.updateProperty(req, res);
});

router.delete("/:id", (req, res) => {
  propertiesController.deleteProperty(req, res);
});

router.get("/:propertyId/details", (req, res) => {
  propertiesController.getPropertyDetails(req, res);
});

module.exports = router;
