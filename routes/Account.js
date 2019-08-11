const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary");
const router = express.Router();

const Account = require("../models/UserAccount");

router.get(
  "/useraccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(account => {
      if (!account) {
        res.status(404).json({ noAccount: "No Account For user" });
      } else {
        res.status(200).json(account);
      }
    });
  }
);

router.get('/useraccount/all', passport.authenticate('jwt',{session:false}),(req,res) => {
  Account.find({})
   .then(account => {
     res.json(account)
   }).catch(err => console.log(err))
})

router.post(
  "/useraccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOne({ user: req.user.id }).then(account => {
      if (account) {
        res.status(400).json({ msg: "account has already been their" });
      } else {
        const newAccount = new Account({
          userName: req.body.userName,
          bio: req.body.bio,
          avatar: req.body.avatar,
          email: req.body.email,
          user: req.user.id
        });
        newAccount.save().then(account => {
          res.status(200).json(account);
        });
      }
    });
  }
);

router.put(
  "/useraccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          userName: req.body.userName,
          bio: req.body.bio,
          avatar: req.body.avatar,
          email: req.body.email,
          user: req.user.id
        }
      }
    )
      .then(account => {
        res.status(200).json(account);
      })
      .catch(err => res.json(err));
  }
);

router.delete(
  "/useraccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findOneAndDelete({ user: req.user.id })
      .then(account => {
        res.status(200).json({ msg: "suucessfullt=y deleted" });
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
