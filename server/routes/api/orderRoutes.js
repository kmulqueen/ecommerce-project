const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const protect = require("../../middleware/authMiddleware");

// Matches with "/api/orders" - PROTECTED ROUTE
router.route("/").post(protect, orderController.createNewOrder);

module.exports = router;
