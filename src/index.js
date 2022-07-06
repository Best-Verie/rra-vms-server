const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDb = require("./config/db");
const authRoute = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToDb();
const port = 7000;

app.use("/api/v1/auth", authRoute);
app.listen(port, () => {
  console.log( `Server is running on port ${port}`);
});