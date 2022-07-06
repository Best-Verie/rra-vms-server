const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDb = require("./config/db");
const authRoute = require("./routes/auth.routes");
const carOwnerRoute = require("./routes/car-owner.route");
const vehicleRoute = require("./routes/vehicle.route");
const app = express();
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require("./config/swagger-config.json");
const swaggerDocs = swaggerJsDocs(JSON.parse(JSON.stringify(swaggerConfig)));

app.use(cors());
app.use(bodyParser.json());
connectToDb();
const port = 7000;


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/car-owner", carOwnerRoute);
app.use("/api/v1/vehicle", vehicleRoute);
app.listen(port, () => {
  console.log( `Server is running on port ${port}`);
});


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, false, { docExpansion: "none" })
);