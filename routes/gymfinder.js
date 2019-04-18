const express = require('express');
const router = express.Router()

const passport = require('passport');

const Profile = require('../models/Gymprofile');
const Courses  = require('../models/Courses')
router.get('/gymfinder',(req,res) => {
    Profile.find({})
    .then(profile => {
        res.status(200).json(profile)
    }).catch(err => res.status(404).json({msg:'no profile for gyms'}))
})

router.get('/gymfinder/:id',(req,res) => {
    Profile.findById(req.params.id)
     .then(profile => {
         Courses.findOne({admin:profile.admin})
          .then(course => {
              res.json(course)
          })
          .catch(err => console.log(err))
     })
})

module.exports = router