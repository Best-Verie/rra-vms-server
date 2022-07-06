const express = require("express");
const { registerCarOwner, getAllCarOwners, getOwnerByNationalId } = require("../controller/car-owner.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/car-owner/create:
 *  post:
 *    tags:
 *      - Owner
 *    description: Create an owner
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Owner'
 *    responses:
 *      200:
 *        description: An owner
 *      500:
 *        description: Server error
 */
router.post("/create", protect,registerCarOwner);

/**
 * @swagger
 * /api/v1/car-owner/all:
 *  get:
 *   tags:
 *    - Owner
 *   description: Get all owners
 *   responses:
 *    200:
 *     description: An array of owners
 *    500:
 *     description: Server error
 *
 *
 *
 */

router.get("/all", protect, getAllCarOwners);


/**
 * @swagger
 * /api/v1/car-owner/{nationalId}:
 *  get:
 *   tags:
 *    - Owner
 *   description: Get woner by nationalId
 *   parameters:
 *    - name: nationalId
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: An owner
 *    500:
 *     description: Server error
 */
router.get("/:nationalId", protect, getOwnerByNationalId);

module.exports = router;