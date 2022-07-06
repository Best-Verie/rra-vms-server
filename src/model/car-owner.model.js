const mongoose = require("mongoose");
const Joi = require("joi");


/**
 * @swagger
 * definitions:
 *   Owner:
 *     properties:
 *       names:
 *         type: string
 *       phone:
 *         type: string
 *       nationalId:
 *         type: string
 *       address:
 *         type: string
 *     required:
 *       - names
 *       - phone
 *       - nationalId
 *       - address
 */

const ownerSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    nationalId: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
    vehicles:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Vehicle",
        default: []
    }

  }
  )


exports.validateData = (data) => {
  const schema =
     Joi.object({
          names: Joi.string().min(3).required(),
          phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
          nationalId: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
          address: Joi.string().min(5).required(),
          vehicles: Joi.array().items(Joi.string().min(1).required()),
        });
  return schema.validate(data);
};

const Owner = mongoose.model("Owner", ownerSchema);
module.exports.Owner = Owner;