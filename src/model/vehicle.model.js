const mongoose = require("mongoose");
const Joi = require("joi");
const ownerShip = require("../enum/ownership.enum");
const { string } = require("joi");


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
        required: true,
    },
    modelName:{
        type: String,
        required: true,
    },
    ownerShip: {
        default: 'NEW',
        type: String,
        enum: ['USED', 'NEW']
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
         plateNumber: Joi.string().min(3).required(),
         modelName: Joi.string().min(3).required(),
         ownerShip: Joi.string().min(3).required(),
        // owner: Joi.string().min(3).required(),
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
