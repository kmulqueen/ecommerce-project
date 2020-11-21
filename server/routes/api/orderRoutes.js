const router = require("express").Router();
const orderController = require("../../controllers/orderController");
const protect = require("../../middleware/authMiddleware");

// POST "/api/orders" - PROTECTED ROUTE
router.route("/").post(protect, orderController.createNewOrder);

// GET "/api/orders/myorders" - PROTECTED ROUTE
router.route("/myorders").get(protect, orderController.getUserOrders);

// GET "/api/orders/:id" - PROTECTED ROUTE
router.route("/:id").get(protect, orderController.getOrderById);

// PUT "/api/orders/:id/pay" - PROTECTED ROUTE
router.route("/:id/pay").put(protect, orderController.updateOrderToPaid);

module.exports = router;
