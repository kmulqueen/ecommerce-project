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

      res.status(201).json(createdOrder);
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
  updateOrderToPaid: async function (req, res) {
    const order = await db.Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  },
  getUserOrders: async function (req, res) {
    // Find all orders associated with the logged in user
    const orders = await db.Order.find({ user: req.user._id });

    res.json(orders);
  },
  getAllOrders: async function (req, res) {
    const orders = await db.Order.find({}).populate("user", "id name");
    res.json(orders);
  },
  updateOrderToDelivered: async function (req, res) {
    const order = await db.Order.findById(req.params.id);

    if (order) {
      (order.isDelivered = true), (order.deliveredAt = Date.now());

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  },
};
