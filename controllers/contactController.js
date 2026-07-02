const Contact = require("../models/Contact.js");
const mongoose = require("mongoose");

const sendMessage = async (req, res) => {
  try {
    console.log("Controller ReadyState:", mongoose.connection.readyState);
    console.log("Controller DB:", mongoose.connection.name);

    const count = await Contact.countDocuments();

    return res.json({
      readyState: mongoose.connection.readyState,
      database: mongoose.connection.name,
      count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
};