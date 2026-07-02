const express = require("express");
const RequestBlood = require("../models/RequestBlood");

const router = express.Router();

/**
 * CREATE BLOOD REQUEST
 */
router.post("/", async (req, res) => {
  try {
    const {
      patientname,
      bloodGroup,
      hospitalname,
      hospitaladdress,
      contactnumber,
      city,
      unitsrequired,
      additionalinformation,
    } = req.body;

    const newRequest = await RequestBlood.create({
      patientname,
      bloodGroup,
      hospitalname,
      hospitaladdress,
      contactnumber,
      city,
      unitsrequired,
      additionalinformation,
    });

    res.status(201).json({
      message: "Blood request created successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET ALL BLOOD REQUESTS
 */
router.get("/", async (req, res) => {
  try {
    const requests = await RequestBlood.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET SINGLE REQUEST BY ID
 */
router.get("/:id", async (req, res) => {
  try {
    const request = await RequestBlood.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;