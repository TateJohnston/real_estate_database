const express = require("express");
const router = express.Router();
const tenantsController = require("../controllers/tenantsController");

router.post("/headtenant/create", (req, res) => {
  tenantsController.createHeadTenant(req.body, res);
});

router.post("/subtenant/create", (req, res) => {
  tenantsController.createSubTenant(req.body, res);
});

router.put("/headtenant/:headtenantid", (req, res) => {
  tenantsController.updateHeadTenant(req.body, res);
});

router.put("/subtenant/:subtenantid", (req, res) => {
  tenantsController.updateSubTenant(req.body, res);
});

router.get("/headtenants", (req, res) => {
  tenantsController.getAllHeadTenants(req, res);
});

router.get("/subtenants", (req, res) => {
  tenantsController.getAllSubTenants(req, res);
});

module.exports = router;
