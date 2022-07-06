const express = require("express");
const { registerCarOwner, getAllCarOwners, getOwnerByNationalId } = require("../controller/car-owner.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create", protect,registerCarOwner);
router.get("/all", protect, getAllCarOwners);
router.get("/:nationalId", protect, getOwnerByNationalId);

module.exports = router;