const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function validateRegistration(request) {
  if (request.username.trim().length === 0) {
    return "Please enter a username";
  }
  if (request.password.trim().length < 6) {
    return "Password must be at least 6 characters long";
  }
  // Use if repeat password verificatin is required
  // if(request.password !== request.repeatPassword){
  //     return "Passwords don't match"
  // }
}

router.post("/register", async (req, res) => {
  let errorMessage = validateRegistration(req.body);
  if (errorMessage) {
    res.send({ error: errorMessage });
  }
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (user) {
      res.send({ success: false, message: "Username taken" });
    } else {
      let hash = await bcrypt.hash(req.body.password, 10);
      let newUser = new User({
        username: req.body.username,
        password: hash
      });
      newUser.save(function(err, user) {
        if (err) {
          res.send({ success: false, error: err });
        }
        console.log("New user created!");
        res.send({ success: true });
        // res.redirect("/login");
      });
    }
  });
});

router.post("/login", async (req, res, next) => {
  User.findOne({ username: req.body.username }, async function(err, user) {
    if (!user) {
      res.status(401).send({ success: false, message: "Incorrect username" });
    } else {
      let match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        res.status(401).send({ success: false, message: "Incorrect password" });
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

function jwtVerify(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).send({ error: "Invalid Request" });
  }
}

module.exports = {
    router,
    jwtVerify
}
