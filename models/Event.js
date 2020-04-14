const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  }
});
module.exports = Event = mongoose.model("events", EventSchema);