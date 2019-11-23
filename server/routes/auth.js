const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateRegistration } = require("../utils/authUtils");

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
        let newUser = new User({
          username: req.body.username,
          password: hash
        });
        newUser.save(function(err, user) {
          if (err) {
            next(err);
          }
          console.log("New user created!");
          res.status(201).send({ success: true });
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
        res.status(200).send({ success: true, token: token, user: user });
      }
    }
  });
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, sameSite: true });
  res.status(200).send({ success: true, message: "User logged out"});
});

module.exports = router;
