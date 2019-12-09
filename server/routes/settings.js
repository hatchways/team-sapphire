const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/Settings");
const Company = require("./../models/Company");
const UserModel = require("./../models/User");
const Interface = require("./../models/Interface");
const { jwtVerify } = require("../utils/authUtils");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const saveSettings = (settings, res) => {
  settings.save(err => {
    res.send({ success: true, settings });
  });
};

// Get company names of a given user
router.get("/:email/company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email })
    .populate("companies")
    .exec((err, settings) => {
      if (settings) {
        let companyNames = [];
        settings.companies.forEach(company => companyNames.push(company.name));
        res.send({ companies: companyNames, settings });
      } else {
        next("User settings doesn't exist!");
      }
    });
});

// Adds a company to a users company list; if company doesn't exist, create on and then add
router.put("/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email }, (err, settings) => {
    if (settings) {
      Company.findOrCreate({ name: req.params.company }, (err, company) => {
        settings.companies = settings.companies.concat(company._id);
        saveSettings(settings, res);
      });
    } else {
      next("User settings doesn't exist!");
    }
  });
});

// Updates platforms user wants to search
router.put("/:email/platform/:platform", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email }, (err, settings) => {
    if (settings) {
      let platforms = { ...settings.platforms };
      platforms[req.params.platform] = !platforms[req.params.platform];
      settings.platforms = platforms;
      saveSettings(settings, res);
    } else {
      next("User settings doesn't exist!");
    }
  });
});


// Gets users settings
router.get("/:email", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email }).populate('companies').exec(async (err, settings) => {
    if (settings) {
      let companyNames = [];
      settings.companies.forEach(company => companyNames.push(company.name));
      const mentionsInterface = new Interface();
      const mentions = await mentionsInterface.getNewestMentions(companyNames);
      res.send({ success: true, settings, mentions });
    } else {
      next("User settings doesn't exist!");
    }
  })
})

// Deletes a company from a users list of tracked companies
router.delete("/:email/company/:company", jwtVerify, (req, res, next) => {
  SettingsModel.findOne({ email: req.params.email }).populate('companies').exec((err, settings) => {
    if (settings) {
      settings.companies = settings.companies.filter(
        company => company.name !== req.params.company
      );
      saveSettings(settings, res);
    } else {
      next("User settings doesn't exist!");
    }
  });
});

module.exports = router;
