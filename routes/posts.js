const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary");
const router = express.Router();
const multer = require("../config/multer");
require("../config/cloudinary");

const Posts = require("../models/Post");
const Account = require("../models/UserAccount");
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.find()
      .sort({ date: -1 })
      .then(posts => {
        res.json(posts);
      })
      .catch(() => res.status(404).json({ noPostsFound: " No Posts Found" }));
  }
);

router.get(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.find({ _id: req.params.id })
      .then(post => {
        res.json(post);
      })
      .catch(() => res.status(404).json({ noPostFound: "no Post Found" }));
  }
);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  multer.single("image"),
  async (req, res) => {
    // let result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPost = new Posts({
      name: req.body.name,
      avatar: req.body.avatar,
      // image: result.secure_url,
      caption: req.body.caption,
      User: req.user.id
    });
    newPost
      .save()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => console.log(err));
  }
);
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id })
      .then(profile => {
        Posts.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }

            // Delete
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/likes/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id })
      .then(() => {
        Posts.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyLiked: "You have already liked" });
            }
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => {
              res.status(200).json({ post });
            });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(profile => {
      Posts.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);
module.exports = router;
