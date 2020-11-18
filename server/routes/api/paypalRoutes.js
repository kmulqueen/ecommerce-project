const router = require("express").Router();
const paypalController = require("../../controllers/paypalController");

// Matches with "/api/config/paypal"
router.route("/paypal").get(paypalController.config);

module.exports = router;
