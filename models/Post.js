const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "usersapp"
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "usersapp"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "usersapp"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Posts = mongoose.model("posts", PostSchema);
