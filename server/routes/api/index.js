const router = require("express").Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const paypalRoutes = require("./paypalRoutes");

// Define routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/config", paypalRoutes);

module.exports = router;
