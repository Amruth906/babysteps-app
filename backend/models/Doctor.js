const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  workingHours: { start: String, end: String },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
