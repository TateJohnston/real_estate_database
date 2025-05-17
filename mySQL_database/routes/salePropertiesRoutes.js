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
module.exports = router;
