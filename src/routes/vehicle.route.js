const express = require("express");
const { registerVehicle, getVehicleByPlateNumber, getAllVehicles } = require("../controller/vehicle.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/vehicle/create:
 *  post:
 *    tags:
 *      - Vehicle
 *    description: Create an vehicle
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Vehicle'
 *    responses:
 *      200:
 *        description: An vehicle
 *      500:
 *        description: Server error
 */
router.post("/create", protect,registerVehicle);


/**
 * @swagger
 * /api/v1/vehicle/all:
 *  get:
 *   tags:
 *    - Vehicle
 *   description: Get all vehicles
 *   responses:
 *    200:
 *     description: An array of vehicles
 *    500:
 *     description: Server error
 *
 *
 *
 */

router.get("/all", protect,getAllVehicles);

/**
 * @swagger
 * /api/v1/vehicle/{plateNumber}:
 *  get:
 *   tags:
 *    - Vehicle
 *   description: Get vehivle by plateNumber
 *   parameters:
 *    - name: plateNumber
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: An vehivcle
 *    500:
 *     description: Server error
 */
router.get("/:plateNumber", protect, getVehicleByPlateNumber);

module.exports = router; 