const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
const app = express();
const realtorRoutes = require("./routes/realtorsRoutes");
const clientRoutes = require("./routes/clientsRoutes");
const propertyRoutes = require("./routes/propertiesRoutes");
const salePropertiesRoutes = require("./routes/salePropertiesRoutes");
const rentalPropertyRoutes = require("./routes/rentalPropertiesRoutes");

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

app.use("/api/realtors", realtorRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/saleProperties", salePropertiesRoutes);
app.use("/api/rentalProperties", rentalPropertyRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
