const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const { protect, admin } = require("../../middleware/authMiddleware");

// Matches with "/api/orders" - PROTECTED ROUTE
router.route("/").get(protect, admin, orderController.getAllOrders);
router.route("/").post(protect, orderController.createNewOrder);

// Matches with "/api/orders/myorders" - PROTECTED ROUTE
router.route("/myorders").get(protect, orderController.getUserOrders);

// Matches with "/api/orders/:id" - PROTECTED ROUTE
router.route("/:id").get(protect, orderController.getOrderById);

// Matches with "/api/orders/:id/pay" - PROTECTED ROUTE
router.route("/:id/pay").put(protect, orderController.updateOrderToPaid);

module.exports = router;
