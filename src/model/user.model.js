const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    
    names: {
      type: String,
      required: true,
    },

    email: {
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
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  return token;
};

exports.validateData = (data, action) => {
  const schema =
    action === "login"
      ? Joi.object({
          email: Joi.string().min(5).required().email(),
          nationalId: Joi.string().min(16).max(16).required(),
        })
      : Joi.object({
          names: Joi.string().min(3).required(),
          email: Joi.string().min(5).required().email(),
          phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
          nationalId: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
        });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;