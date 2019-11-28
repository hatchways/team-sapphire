const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/Settings");
const UserModel = require("./../models/User");
const Interface = require("./../models/Interface");
const { jwtVerify } = require("../utils/authUtils");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true  });

const saveSettings = (settings, res) => {
  settings.save((err) => {
    res.send({ success: true, settings });
  });
}

router.put("/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (settings) {
        settings.companies = settings.companies.concat(req.params.company);
        saveSettings(settings, res);
      } else {
        next("User settings doesn't exist!");
      }
    })
})

router.put("/:email/platform/:platform", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (settings) {
        let platforms = {...settings.platforms};
        platforms[req.params.platform] = !platforms[req.params.platform];
        settings.platforms = platforms;
        saveSettings(settings, res);
      } else {
        next("User settings doesn't exist!");
      }
    })
})

router.get("/:email", jwtVerify, async (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    async (err, settings) => {
      if (settings) {
        let interface = new Interface();
        const mentions = await interface.getNewestMentions(settings.companies);
        res.send({ success: true, settings, mentions });
      } else {
        next("User settings doesn't exist!");
      }
    })
})

router.delete("/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (settings) {
        settings.companies = settings.companies.filter(company => company !== req.params.company);
        saveSettings(settings, res);
      } else {
        next("User settings doesn't exist!");
      }
    })
})

module.exports = router;
