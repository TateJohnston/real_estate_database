const express = require("express");
const router = express.Router();
const realtorsController = require("../controllers/realtorsController");

router.get("/", (req, res) => {
  realtorsController.getRealtors(res);
});

router.get("/:realtorid", (req, res) => {
  realtorsController.getRealtorById(req, res);
});

router.post("/create", (req, res) => {
  realtorsController.createRealtor(req.body, res);
});

router.put("/:realtorid", (req, res) => {
  realtorsController.updateRealtor(req, res);
});

router.delete("/:realtorid", (req, res) => {
  realtorsController.deleteRealtor(req, res);
});

module.exports = router;
