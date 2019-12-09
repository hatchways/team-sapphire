const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/Settings");
const Company = require("./../models/Company");
const UserModel = require("./../models/User");
const Interface = require("./../models/Interface");
const { jwtVerify } = require("../utils/authUtils");
const { delayedEmailQueue } = require("../services/emails/email");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

router.post("/queue/:email", jwtVerify, (req, res, next) => {
  UserModel.findOne({ username: req.params.email }).exec((err, user) => {
    if (user) {
      if (!user.isVerified) {
        const delayedMsg = {
          from: "welcome@mentionscrawler.com",
          to: user.username,
          subject: "Interact with APP",
          text: "You didnt checkout the dashboard!",
          html: "<strong>Checkout your dashbooard!</strong>"
        };
        delayedEmailQueue.add(delayedMsg, { delay: 10000 });
      }
      res.status(200).send({ success: true, message: "email sent to user" });
    } else {
      next("User settings doesn't exist!");
    }
  });
});

module.exports = router;
