const db = require("../models");

module.exports = {
  authenticateUser: async function (req, res) {
    const { email, password } = req.body;

    // Try to find user by email
    const user = await db.User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
      });
    } else {
      res.status(401).json({ message: "Invalid login credentials." });
    }
  },
};
