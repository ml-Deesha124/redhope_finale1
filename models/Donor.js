const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },

    bloodGroup: { type: String, required: true },

    password: { type: String, required: true },

    age: { type: Number, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },

    city: { type: String, required: true },

    availability: {
      type: Boolean,
      default: true,
    },

isEligible: {
  type: Boolean,
  default: false,
},

eligibilityStatus: {
  type: String,
  default: "Not Checked",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);