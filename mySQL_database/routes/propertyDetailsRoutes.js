const express = require("express");
const router = express.Router();
const propertyDetailsController = require("../controllers/propertyDetailsController");

router.get("/", (req, res) => {
  propertyDetailsController.getPropertyDetails(res);
});

router.post("/create", (req, res) => {
  propertyDetailsController.createPropertyDetails(req.body, res);
});

router.put("/:id", (req, res) => {
  propertyDetailsController.updatePropertyDetails(req, res);
});

router.delete("/:id", (req, res) => {
  propertyDetailsController.deletePropertyDetails(req, res);
});
module.exports = router;
