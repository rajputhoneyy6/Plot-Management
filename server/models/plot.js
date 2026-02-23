const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  block: {
    type: String,
    required: true
  },
  plotNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "registered"],
    default: "available"
  },
  registeredBy: {
    type: String,
    default: ""
  },
  saleDate: {
  type: Date
  }
}, {
  timestamps: true   // 👈 ADD THIS
});

module.exports = mongoose.model("Plot", plotSchema);