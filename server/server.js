const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

// Initialize env, app, and DB connection
dotenv.config();
connectDB();
const app = express();

// Add routes, both API and view
app.use(routes);

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
