const router = require("express").Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

// Define routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);

module.exports = router;
