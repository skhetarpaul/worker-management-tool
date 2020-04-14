const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
  noOfProjects: {
    type: Number,
    required: true,
    minimum: 1,
    maximum: 10,
    description: "Value must be in range 1 to 10"
  },
  application: {
    type: String,
    enum: ["Product", "Operations"],
    required: true
  },
  location: {
    type: String,
    required: true
  }
});
module.exports = Manager = mongoose.model("managers", ManagerSchema);