const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/Settings");
const UserModel = require("./../models/User");
const { jwtVerify } = require("../utils/authUtils");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true  });

const saveSettings = (settings, res) => {
  settings.save((err) => {
    if (err) {
      next(err);
    }
  });
  res.send({ error: false, settings });
}

router.post("/settings/:email", jwtVerify, (req, res, next) => {
  UserModel.findOne({ username: req.params.email },
    (err, user) => {
      if (err) {
        next(err);
      }
      if (user) {
        SettingsModel.findOne({ email: req.params.email },
          (err, settings) => {
            if (err) {
              next(err);
            }
            if (settings) {
              res.send({ error: true });
            } else {
              let settings = new SettingsModel({
                _id: mongoose.Types.ObjectId(),
                email: req.params.email,
                companies: [req.body.company],
                platforms: {
                  reddit: true,
                  twitter: true,
                  facebook: true,
                  amazon: true,
                  forbes: true,
                  shopify: true,
                  businessInsider: true
                }
              });
              user.settings = settings;
              user.save((err) => {
                if (err) {
                  next(err);
                }
              });
              saveSettings(settings, res);
            }
          })
      } else {
        res.send({ error: true });
      }
    })

})

router.put("/settings/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        next(err);
      }
      if (settings) {
        settings.companies = settings.companies.concat(req.params.company);
        saveSettings(settings, res);
      } else {
        res.send({ error: true });
      }
    })
})

router.put("/settings/:email/platform/:platform", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        next(err);
      }
      if (settings) {
        //create a new copy of platforms while maintaining the same order (Object.create()) does not keep the same order
        const platforms = {
          reddit: settings.platforms.reddit,
          twitter: settings.platforms.twitter,
          facebook: settings.platforms.facebook,
          amazon: settings.platforms.amazon,
          forbes: settings.platforms.forbes,
          shopify: settings.platforms.shopify,
          businessInsider: settings.platforms.businessInsider
        };
        platforms[req.params.platform] = !platforms[req.params.platform];
        settings.platforms = platforms;
        saveSettings(settings, res);
      } else {
        res.send({ error: true });
      }
    })
})

router.get("/settings/:email", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        next(err);
      }
      if (settings) {
        res.send({ error: false, settings });
      } else {
        res.send({ error: true });
      }
    })
})

router.delete("/settings/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        next(err);
      }
      if (settings) {
        settings.companies = settings.companies.filter(company => company !== req.params.company);
        saveSettings(settings, res);
      } else {
        res.send({ error: true });
      }
    })
})

module.exports = router;
