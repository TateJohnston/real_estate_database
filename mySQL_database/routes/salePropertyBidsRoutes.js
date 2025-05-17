const express = require("express");
const router = express.Router();
const salePropertyBidsController = require("../controllers/salePropertyBidsController");

router.get("/", (req, res) => {
  salePropertyBidsController.getSalePropertyBids(res);
});

router.post("/create", (req, res) => {
  salePropertyBidsController.createSalePropertyBids(req.body, res);
});

router.put("/:id", (req, res) => {
  salePropertyBidsController.updateSalePropertyBids(req, res);
});

router.delete("/:id", (req, res) => {
  salePropertyBidsController.deleteSalePropertyBids(req, res);
});
module.exports = router;
