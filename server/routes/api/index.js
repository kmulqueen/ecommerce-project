const router = require("express").Router();
const productRoutes = require("./productRoutes");

// Define routes
router.use("/products", productRoutes);

module.exports = router;
