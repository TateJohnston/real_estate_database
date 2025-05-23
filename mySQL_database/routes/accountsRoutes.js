"use strict";
const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");

router.get("/fortnightlyreport", (req, res) => {
  accountsController.fortnightlyReport(req, res);
});

router.get("/payments", (req, res) => {
  accountsController.getPayments(req, res);
});

router.get("/payments/report", (req, res) => {
  accountsController.getRentalPaymentsReport(req, res);
});

router.get("/payments/report/overdue", (req, res) => {
  accountsController.getOverdueRentalPaymentsReport(req, res);
});

router.put("/payments/:rentalpropertyid", (req, res) => {
  accountsController.editPayment(req, res);
});

router.post("/payment/create", (req, res) => {
  accountsController.createPayment(req.body, res);
});
module.exports = router;
