const express = require("express");
const Admin = require("../models/Admin.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * CREATE ADMIN
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ADMIN LOGIN
 */
router.post("/login", async (req, res) => {
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
});

module.exports = router;