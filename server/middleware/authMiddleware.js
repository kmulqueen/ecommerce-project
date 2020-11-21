const jwt = require("jsonwebtoken");
const User = require("../models").User;

module.exports = {
  protect: async function (req, res, next) {
    let token;

    // If Bearer token found
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from the authorization header
        token = req.headers.authorization.split(" ")[1];
        // Decode token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Set req.user to the authorized user
        req.user = await User.findById(decodedToken.id).select("-password");
        next();
      } catch (error) {
        res
          .status(401)
          .json({ message: "Unauthorized request. Please login." });
      }
    }

    if (!token) {
      res.status(401).json({ message: "Unauthorized request. Please login." });
    }
  },
  admin: function (req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "Not authorized as admin." });
    }
  },
};
