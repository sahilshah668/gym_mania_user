const express = require('express');
const router = express.Router()

const passport = require('passport');

const Profile = require('../models/Gymprofile');
const Courses  = require('../models/Courses');
const Schedule  = require('../models/Schedule');
const Trainer = require('../models/Trainer')
const Gallery = require('../models/Gallery')

router.get('/gymfinder',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.find({})
    .then(profile => {
        res.status(200).json(profile)
    }).catch(err => res.status(404).json({msg:'no profile for gyms'}))
})

router.get('/gymfinder/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.findById(req.params.id)
     .then(async profile => {
         await Courses.findOne({admin:profile.admin})
          .then(async course => {
           await Schedule.findOne({admin:profile.admin})
              .then(async schedule => {
                await  Trainer.findOne({admin:profile.admin}) 
                 .then(async trainer => {
                     Gallery.findOne({admin:profile.admin})
                      .then(gallery => {
                          res.status(200).json({
                              profile:profile,
                              course:course,
                              schedule:schedule,
                              trainer:trainer,
                              gallery:gallery
                          })
                      })
                 })
             })
          })
          .catch(err => console.log(err))
     })
})

module.exports = router