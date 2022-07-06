const express = require("express");
const { registerCarOwner, getAllCarOwners, getOwnerByNationalId } = require("../controller/car-owner.controller");
const router = express.Router();

router.post("/create", registerCarOwner);
router.get("/all", getAllCarOwners);
router.get("/:nationalId", getOwnerByNationalId);

module.exports = router;