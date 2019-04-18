const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newGallery = new Schema({
  admin: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = Gallery = mongoose.model("gallery", newGallery);
