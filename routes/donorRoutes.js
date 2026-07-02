const express = require("express");
const bcrypt = require("bcryptjs");


const Donor = require("../models/Donor");
const {
  registerDonor,
  loginDonor,
  getDonors,
} = require("../controllers/donorController");

const router = express.Router();

/**
 * REGISTER DONOR
 */
router.post("/register", registerDonor);

/**
 * LOGIN DONOR
 */
router.post("/login", loginDonor);

/**
 * GET ALL DONORS
 */
router.get("/", getDonors);

module.exports = router;