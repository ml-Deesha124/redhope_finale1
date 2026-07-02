const RequestBlood = require("../models/RequestBlood.js");

/**
 * CREATE BLOOD REQUEST
 */
const createRequest = async (req, res) => {
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

    const request = await RequestBlood.create({
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
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL REQUESTS
 */
const getRequests = async (req, res) => {
  try {
    const requests = await RequestBlood.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET REQUEST BY ID
 */
const getRequestById = async (req, res) => {
  try {
    const request = await RequestBlood.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
};