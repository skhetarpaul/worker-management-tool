const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateAdminInput = require("../../validation/admin");
const validateManagerInput = require("../../validation/manager");
const validateReceptionistInput = require("../../validation/receptionist");

const User = require("../../models/User");
const Receptionist = require('../../models/Receptionist')
const Admin = require('../../models/Admin')
const Manager = require('../../models/Manager')

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          post: req.body.post
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  router.post("/login", (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;

    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 172800 // 2 days in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  // router.post("/create", (req, res) => {

  //   const { errors, isValid } = validateEventInput(req.body);
  
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  //   const newEvent = new Event({
  //     name: req.body.name,
  //     venue: req.body.venue
  //   });
  //   newEvent
  //     .save()
  //     .then(event => res.json(event))
  //     .catch(err => console.log(err));
  // });

  // router.get('/view', (req, res) => {
  //   Event.find(function(err, events) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         res.json(events);
  //         console.log(events);
  //     }
  // });
  // })

  router.get("/view-user",(req, res) => {
    const _id = req.query.id
    // const _id = `5e8c2067169e892fd8ffdfc7`
    User.findOne({_id}).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "no user found with these credentials" });
      }
      else {
        console.log(user, "view-user data fetched")
        res.json(user)
      }
    })
  })

  router.post("/create-manager", (req, res) => {

    const { errors, isValid } = validateManagerInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newManager = new Manager({
        noOfProjects: req.body.noOfProjects,
        application: req.body.application,
        location : req.body.location,
      });
      newManager
        .save()
        .then(manager => res.json(manager))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.post("/create-receptionist", (req, res) => {

    const { errors, isValid } = validateReceptionistInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newReceptionist = new Receptionist({
        age: req.body.age,
        previousExperienceYears: req.body.previousExperienceYears,
        location : req.body.location,
      });
      newReceptionist
        .save()
        .then(receptionist => res.json(receptionist))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.post("/create-admin", (req, res) => {

    const { errors, isValid } = validateAdminInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newAdmin = new Admin({
        age: req.body.age,
        previousExperienceYears: req.body.previousExperienceYears,
        reason : req.body.reason,
      });
      newAdmin
        .save()
        .then(admin => res.json(admin))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.get('/view-managers', (req, res) => {
    people = []
    Manager.find(function(err, managers) {
      if (err) {
          console.log(err);
      } else {
          res.json(managers);  
      }
  });
  })

  router.get('/view-receptionists', (req, res) => {
    Receptionist.find(function(err, receptionists) {
      if (err) {
          console.log(err);
      } else {
          res.json(receptionists); 
          console.log(receptionists) 
      }
  });
  })
  



  module.exports = router;