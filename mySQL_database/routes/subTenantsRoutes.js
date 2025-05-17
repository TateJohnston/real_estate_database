const express = require("express");
const router = express.Router();
const subTenantsController = require("../controllers/subTenantsController");

router.get("/", (req, res) => {
  subTenantsController.getSubTenants(res);
});

router.post("/create", (req, res) => {
  subTenantsController.createSubTenant(req.body, res);
});

router.put("/:id", (req, res) => {
  subTenantsController.updateSubTenant(req, res);
});

router.delete("/:id", (req, res) => {
  subTenantsController.deleteSubTenant(req, res);
});
module.exports = router;
