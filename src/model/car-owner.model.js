const mongoose = require("mongoose");
const Joi = require("joi");


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
        });
  return schema.validate(data);
};

const Owner = mongoose.model("Owner", ownerSchema);
module.exports.Owner = Owner;