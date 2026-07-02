const Donor = require("../models/Donor.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const registerDonor = async (req, res) => {
  try {
    const { username, email, contact, bloodGroup, password, age, gender, weight, city, availability } = req.body;
console.log(require("mongoose").connection.readyState);
    const existing = await Donor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Donor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = await Donor.create({
      username,
      email,
      contact,
      bloodGroup,
      password: hashedPassword,
      age,
      gender,
      weight,
      city,
      availability,
    });

    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, donor.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: donor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDonors = async (req, res) => {
  try {
    console.log("Ready State:", mongoose.connection.readyState);
    console.log("Database:", mongoose.connection.name);

    const donors = await Donor.find();

    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.json(donor);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateDonor = async (req, res) => {
  try {
    const { username, email, contact } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        contact,
      },
      {
        new: true,
      }
    );

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.json(donor);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Donor.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });

    res.json({
      message: "Password Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const updateEligibility = async (req, res) => {
  try {
    const { isEligible, eligibilityStatus } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        isEligible,
        eligibilityStatus,
      },
      {
        new: true,
      }
    );

    res.json(donor);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({
      email,
    });

    if (!donor) {
      return res.status(404).json({
        message: "Invalid User",
      });
    }

    donor.password = await bcrypt.hash(password, 10);

    await donor.save();

    res.json({
      message: "Password Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

  module.exports = {
  registerDonor,
  loginDonor,
  getDonors,
  getDonorById,
  updateDonor,
  updatePassword,
  updateEligibility,
  forgotPassword,
};
