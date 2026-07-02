const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Donor.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;