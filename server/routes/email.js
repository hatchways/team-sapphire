const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/Settings");
const Company = require("./../models/Company");
const UserModel = require("./../models/User");
const Interface = require("./../models/Interface");
const { jwtVerify } = require("../utils/authUtils");
const emailQueue = require("../services/emails/email");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

router.post("/queue/:email", jwtVerify, (req, res, next) => {
  console.log("--------- queue route---------------");
  UserModel.findOne({ username: req.params.email }).exec((err, user) => {
    if (user) {
      console.log(user);
      if (!user.isVerified) {
        const delayedMsg = {
          from: "welcome@mentionscrawler.com",
          to: "ahanaghosh94@gmail.com", //user.username
          subject: "Interact with APP",
          text: "You didnt checkout the dashboard!",
          html: "<strong>Checkout your dashbooard!</strong>"
        };
        emailQueue.add(delayedMsg, { delay: 20000 });
      }
    } else {
      next("User settings doesn't exist!");
    }
  });
});

module.exports = router;
