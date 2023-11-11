const mongoose = require("mongoose");
const relativesSchema = new mongoose.Schema({
  name: String,
  relation: String,
  number: String,
});
module.exports = mongoose.model("relative", relativesSchema);
