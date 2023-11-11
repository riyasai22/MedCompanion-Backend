const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  icon: String,
  name: String,
  dosage: Number,
  type: String,
  instruction: String,
  medicationPeriod: Number,
  medicationPeriodType: String,
  reminder: String,
  days: [String],
  alarmSound: String,
  alarmDuration: String,
});

module.exports = mongoose.model("med", medicationSchema);
