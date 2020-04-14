const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  age: {
    type: Number,
    required: true,
    minimum: 20,
    maximum: 100,
    description: "Value must be in range 20 to 100"
  },
  previousExperienceYears: {
    type: Number,
    required: true
  },
  reason: {
      type: String,
      required: true
  }
});
module.exports = Admin = mongoose.model("admin", AdminSchema);