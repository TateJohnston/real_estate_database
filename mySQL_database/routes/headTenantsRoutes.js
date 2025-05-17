const express = require("express");
const router = express.Router();
const headTenantsController = require("../controllers/headTenantsController");

router.get("/", (req, res) => {
  headTenantsController.getHeadTenants(res);
});

router.post("/create", (req, res) => {
  headTenantsController.createHeadTenant(req.body, res);
});

router.put("/:id", (req, res) => {
  headTenantsController.updateHeadTenant(req, res);
});

router.delete("/:id", (req, res) => {
  headTenantsController.deleteHeadTenant(req, res);
});
module.exports = router;
