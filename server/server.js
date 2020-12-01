const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const middleware = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const path = require("path");

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

// In production set client to static folder
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/build")));

  // Any route that is not an api route points to the index.html file in the static build folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
