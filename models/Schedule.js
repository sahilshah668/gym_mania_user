const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  Day: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  Courses: {
    type: String,
    required: true
  },
  Room: {
    type: String,
    required: true
  },
  Trainers: {
    type: String,
    requiredL: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
