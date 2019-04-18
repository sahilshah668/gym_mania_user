const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  admin: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  period: {
    type: Number,
    required: true
  }
});

module.exports = Packages = mongoose.model("package", PackageSchema);
