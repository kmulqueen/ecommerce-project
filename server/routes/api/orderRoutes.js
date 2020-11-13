const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const protect = require("../../middleware/authMiddleware");

// Matches with "/api/orders" - PROTECTED ROUTE
router.route("/").post(protect, orderController.createNewOrder);

// Matches with "/api/orders/:id" - PROTECTED ROUTE
router.route("/:id").get(protect, orderController.getOrderById);

module.exports = router;
