const mongoose = require("mongoose");
const Joi = require("joi");


/**
 * @swagger
 * definitions:
 *   Vehicle:
 *     properties:
 *       chasisNumber:
 *         type: string
 *       manufastureCompany:
 *         type: string
 *       manufactureYear:
 *         type: string
 *       price:
 *         type: string
 *       plateNumber:
 *        type: string
 *       modelName:
 *        type: string
 *     required:
 *       - chassisNumber
 *       - manufastureCompany
 *       - manufactureYear
 *       - price
 *       - plateNumber
 *       - modelName
 */

const vehicleSchema = new mongoose.Schema(
  {
    
    chasisNumber: {
      type: String,
      required: true,
    },

    manufastureCompany: {
      type: String,
      required: true,
    },

    manufactureYear: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
    plateNumber:{
        type: String,
        required: false,
        empty: true,
    },
    modelName:{
        type: String,
        required: true,
    },
   
    // owner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Owner",
    //     required: true,
    // }
  },
  {
    timestamps: true,
  }
);


exports.validateData = (data) => {
  const schema =
     Joi.object({
         chasisNumber: Joi.string().min(3).required(),
         manufastureCompany: Joi.string().min(3).required(),
         manufactureYear: Joi.string().min(3).required(),
         price: Joi.string().min(3).required(),
         plateNumber: Joi.string().min(9),
         modelName: Joi.string().min(3).required(),
    });
  return schema.validate(data);
};

exports.generateRandomPlateNumber = () => {
    const token = Math.floor(Math.random() * 100);
    const plateNumber = `R${generateString(2)}-${token}-${generateString(3)}`;
    return plateNumber;
}


function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports.Vehicle = Vehicle;
