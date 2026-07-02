const mongoose = require("mongoose");

const requestBloodSchema = new mongoose.Schema(
  {
    patientname: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    hospitalname: {
      type: String,
      required: true,
    },
    hospitaladdress: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    unitsrequired: {
      type: Number,
      required: true,
    },
    additionalinformation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestBlood", requestBloodSchema);