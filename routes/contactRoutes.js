const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/**
 * CREATE CONTACT MESSAGE
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET ALL CONTACT MESSAGES
 */
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;