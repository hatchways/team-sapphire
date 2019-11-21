const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SettingsModel = require("./../models/settingsModel");

let databaseConnection = "Waiting for Database response...";

router.get("/", (req, res, next) => {
    res.send(databaseConnection);
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true  });
const database = mongoose.connection;

database.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
database.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

const saveSettings = (settings, res) => {
  settings.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send({ error: false, settings });
}

router.post("/settings/:email", (req, res) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err);
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
        saveSettings(settings, res);
      }
    })
})

router.put("/settings/:email/company/:company", (req, res) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err);
      }
      if (settings) {
        settings.companies = settings.companies.concat(req.params.company);
        saveSettings(settings, res);
      } else {
        res.send({ error: true });
      }
    })
})

router.put("/settings/:email/platform/:platform", (req, res) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err);
      }
      if (settings) {
        settings.platforms[req.params.platform] = !settings.platforms[req.params.platform];
        saveSettings(settings, res);
      } else {
        res.send({ error: true });
      }
    })
})

router.get("/settings/:email", (req, res) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err);
      }
      if (settings) {
        res.send({ error: false, settings });
      } else {
        res.send({ error: true });
      }
    })
})

router.delete("/settings/:email/company/:company", (req, res) => {
  SettingsModel.findOne({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err);
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
