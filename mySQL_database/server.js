const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
const app = express();
const realtorRoutes = require("./routes/realtorsRoutes");
const clientRoutes = require("./routes/clientsRoutes");
const propertyRoutes = require("./routes/propertiesRoutes");
const propertyDetailsRoutes = require("./routes/propertyDetailsRoutes");
const salePropertiesRoutes = require("./routes/salePropertiesRoutes");
const biddersRoutes = require("./routes/biddersRoutes");
const biddingClientsRoutes = require("./routes/biddingClientsRoutes");
const saleHistoryRoutes = require("./routes/saleHistoryRoutes");
const rentalPropertyRoutes = require("./routes/rentalPropertiesRoutes");
const headTenantRoutes = require("./routes/headTenantsRoutes");
const subTenantRoutes = require("./routes/subTenantsRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

app.use("/api/realtors", realtorRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/propertyDetails", propertyDetailsRoutes);
app.use("/api/saleProperties", salePropertiesRoutes);
app.use("/api/bidders", biddersRoutes);
app.use("/api/biddingClients", biddingClientsRoutes);
app.use("/api/saleHistory", saleHistoryRoutes);
app.use("/api/rentalProperties", rentalPropertyRoutes);
app.use("/api/headTenants", headTenantRoutes);
app.use("/api/subTenants", subTenantRoutes);
app.use("/api/payments", paymentsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
