const Admin = require("../models/Admin.js");
const bcrypt = require("bcryptjs");

/**
 * CREATE ADMIN
 */
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN ADMIN
 */
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};