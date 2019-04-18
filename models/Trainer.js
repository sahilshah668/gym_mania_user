const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
  admin: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    require: true
  },
  TrainerType: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  }
});

module.exports = Trainer = mongoose.model("trainer", TrainerSchema);
