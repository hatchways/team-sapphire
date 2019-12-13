const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("./../models/User");
const { jwtVerify } = require("../utils/authUtils");
const { delayedEmailQueue } = require("../services/emails/delayedEmail");
const { weeklyEmailQueue } = require("../services/emails/weeklyEmail");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

router.post("/queue/:email", jwtVerify, (req, res, next) => {
  UserModel.findOne({ username: req.params.email }).exec((err, user) => {
    if (user) {
      if (!user.isVerified) {
        const delayedMsg = {
          from: "welcome@mentionscrawler.com",
          to: user.username,
          subject: "Interact with APP",
          text: "You didnt checkout the dashboard!"
          // jobId: user.id
        };
        const options = {
          delay: 10000,
          jobId: user.id
        };
        delayedEmailQueue.add("InteractEmail", delayedMsg, options);
      }
      res.status(200).send({ success: true, message: "email sent to user" });
    } else {
      next("User settings doesn't exist!");
    }
  });
});

router.get("/queue/:email/report", jwtVerify, (req, res, next) => {
  UserModel.findOne({ username: req.params.email }).exec((err, user) => {
    if (user) {
      if (user.isVerified) {
        const report = {
          from: "welcome@mentionscrawler.com",
          to: user.username,
          subject: "Weekly Report",
          text: "Weekly Report!"
        };

        const options = {
          repeat: { every: 30000 }
        };
        weeklyEmailQueue.add("weeklyReport", report, options);
      }
      res.status(200).send({ success: true, message: "email sent to user" });
    } else {
      next("User settings doesn't exist!");
    }
  });
});

router.put("/queue/:email/emails", jwtVerify, (req, res, next) => {
  UserModel.findOne({ username: req.params.email }).exec((err, user) => {
    if (user) {
      if (user.isVerified) {
        console.log(" --------- before-----");

        // weeklyEmailQueue.getJob(1).then(res => {
        //   console.log(res);
        //   // job.remove();
        // });

        weeklyEmailQueue.removeRepeatable("weeklyReport", {
          repeat: { every: 30000 }
        });
        console.log(" --------- after-----");
      }
      res
        .status(200)
        .send({ success: true, message: "subscription cancelled" });
    } else {
      next("User settings doesn't exist!");
    }
  });
});

module.exports = router;
