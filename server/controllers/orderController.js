const db = require("../models");

module.exports = {
  createNewOrder: async function (req, res) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Check that order items isn't empty
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No items in order." });
    } else {
      const order = new db.Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json({ message: "Order created!", createdOrder });
    }
  },
  getOrderById: async function (req, res) {
    // Find order by ID. Populate the name & email from the user.
    const order = await db.Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  },
};