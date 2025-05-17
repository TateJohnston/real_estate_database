const express = require("express");
const router = express.Router();
const biddersController = require("../controllers/biddersController");

router.get("/", (req, res) => {
  biddersController.getBidders(res);
});

router.post("/create", (req, res) => {
  biddersController.createBidder(req.body, res);
});

router.put("/:id", (req, res) => {
  biddersController.updateBidder(req, res);
});

router.delete("/:id", (req, res) => {
  biddersController.deleteBidder(req, res);
});
module.exports = router;
