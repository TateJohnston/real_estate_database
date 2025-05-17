const express = require("express");
const router = express.Router();
const saleHistoryController = require("../controllers/saleHistoryController");

router.get("/", (req, res) => {
  saleHistoryController.getSalesHistory(res);
});

router.post("/create", (req, res) => {
  saleHistoryController.createSaleHistory(req.body, res);
});

router.delete("/:id", (req, res) => {
  saleHistoryController.deleteSaleHistory(req, res);
});
module.exports = router;
