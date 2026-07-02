const express = require("express");

const {
  registerDonor,
  loginDonor,
  getDonors,
  getDonorById,
  updateDonor,
  updatePassword,
  updateEligibility,
  forgotPassword,
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

/**
 * GET DONOR BY ID
 */
router.get("/:id", getDonorById);

/**
 * UPDATE PROFILE
 */
router.put("/:id", updateDonor);

/**
 * UPDATE PASSWORD
 */
router.put("/:id/password", updatePassword);

/**
 * UPDATE ELIGIBILITY
 */
router.put("/:id/eligibility", updateEligibility);

/**
 * FORGOT PASSWORD
 */
router.put("/forgot-password", forgotPassword);

module.exports = router;