const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

router.get("/", (req, res) => {
  paymentsController.getPayments(res);
});

router.post("/create", (req, res) => {
  paymentsController.createPayment(req.body, res);
});

router.put("/:id", (req, res) => {
  paymentsController.updatePayment(req, res);
});

router.delete("/:id", (req, res) => {
  paymentsController.deletePayment(req, res);
});
module.exports = router;
