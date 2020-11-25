const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const middleware = require("./middleware/errorMiddleware");
const morgan = require("morgan");

// Initialize env, app, and DB connection
dotenv.config();
connectDB();
const app = express();

// Allow JSON data to be accepted in request body
app.use(express.json());

// Morgan logging (Development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Add routes, both API and view
app.use(routes);

// Add uploads folder as static folder
app.use("/uploads", express.static("uploads"));

// Add error handling middleware
app.use(middleware.notFound);
app.use(middleware.errorHandler);

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
