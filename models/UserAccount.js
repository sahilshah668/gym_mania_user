const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersapp"
  },
  avatar: {
    type: String
  },
  userName: {
    type: String
  },
  email: {
    type: String
  },
  bio: {
    type: String,
    required: true
  },
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "usersapp"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "usersapp"
    }
  ]
});

module.exports = Account = mongoose.model("account", AccountSchema);
