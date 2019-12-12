const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const SettingsModel = require("./../models/Settings");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateRegistration, jwtVerify } = require("../utils/authUtils");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/register", async (req, res, next) => {
  let errorMessage = validateRegistration(req.body);
  if (errorMessage) {
    next(errorMessage);
  } else {
    User.findOne({ username: req.body.username }, async (err, user) => {
      if (user) {
        errorMessage = "Username taken";
        next(errorMessage);
      } else {
        let hash = await bcrypt.hash(req.body.password, 10);
        Company.findOrCreate({ name: req.body.company }, (err, company) => {
          if (err) next(err);
          let settings = new SettingsModel({
            _id: mongoose.Types.ObjectId(),
            email: req.body.username,
            companies: [company._id]
          });
          settings.save(err => {
            if (err) next(err);
            let newUser = new User({
              username: req.body.username,
              password: hash,
              isVerified: false,
              settings_id: settings._id
            });
            newUser.save(function(err, user) {
              if (err) next(err);
              console.log("New user created!");
              const msg = {
                to: user.username,
                from: "welcome@mentionscrawler.com",
                subject: "Thanks for registering for MentionsCrawler!",
                text:
                  "Find mentions of your companies through platforms like Reddit and Twitter!",
                html:
                  "<strong>Find mentions of your companies through platforms like Reddit and Twitter!</strong>",
                mail_settings: {
                  sandbox_mode: {
                    enable: true
                  }
                }
              };
              sgMail.send(msg);
              let token = jwt.sign({ userId: user._id }, process.env.SECRET, {
                expiresIn: "24h"
              });
              res.cookie("token", token, { httpOnly: true, sameSite: true });
              res.status(201).send({ success: true, token, user });
            });
          });
        });
      }
    });
  }
});

router.post("/login", async (req, res, next) => {
  let errorMessage;
  User.findOne({ username: req.body.username }, async function(err, user) {
    if (!user) {
      errorMessage = "Incorrect username";
      next(errorMessage);
    } else {
      let match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        errorMessage = "Incorrect password";
        next(errorMessage);
      } else {
        let token = jwt.sign({ userId: user._id }, process.env.SECRET, {
          expiresIn: "24h"
        });
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        res.status(200).send({ success: true, token, user });
      }
    }
  });
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, sameSite: true });
  res.status(200).send({ success: true, message: "User logged out" });
});

module.exports = router;
