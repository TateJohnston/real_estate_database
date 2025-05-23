const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
const app = express();
const realtorRoutes = require("./routes/realtorsRoutes");
const clientRoutes = require("./routes/clientsRoutes");
const propertyRoutes = require("./routes/propertiesRoutes");
const salePropertiesRoutes = require("./routes/salePropertiesRoutes");
const rentalPropertyRoutes = require("./routes/rentalPropertiesRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
const tenantsRoutes = require("./routes/tenantsRoutes");
const biddersRoutes = require("./routes/biddersRoutes");
const swaggerUi = require("swagger-ui-express");

swaggerDocument = require("./swagger.json");

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

app.use("/mp3", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/realtors", realtorRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/saleProperties", salePropertiesRoutes);
app.use("/api/rentalProperties", rentalPropertyRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/tenants", tenantsRoutes);
app.use("/api/bidders", biddersRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
