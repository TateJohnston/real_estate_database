const express = require("express");
const router = express.Router();
const realtorsController = require("../controllers/realtorsController");

router.get("/", (req, res) => {
  realtorsController.getRealtors(res);
});

router.post("/create", (req, res) => {
  realtorsController.createRealtor(req.body, res);
});

router.put("/:id", (req, res) => {
  realtorsController.updateRealtor(req, res);
});

router.delete("/:id", (req, res) => {
  realtorsController.deleteRealtor(req, res);
});

module.exports = router;
