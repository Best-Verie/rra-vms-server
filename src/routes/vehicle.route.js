const express = require("express");
const { registerVehicle, getVehicleByPlateNumber } = require("../controller/vehicle.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create", protect,registerVehicle);
router.get("/:plateNumber", protect, getVehicleByPlateNumber);

module.exports = router; 