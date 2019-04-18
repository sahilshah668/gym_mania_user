const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cousrseSchema = new Schema({
  admin: {
    type: String,
    required: true
  },
  Number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

module.exports = Courses = mongoose.model("course", cousrseSchema);
