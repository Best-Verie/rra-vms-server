const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://verie:verie@cluster0.tm7ca.mongodb.net/rra-vms",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
