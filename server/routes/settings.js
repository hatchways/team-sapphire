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

router.post("/settings/:email", (req, res) => {
  SettingsModel.find({ email: req.params.email },
    (err, settings) => {
      if (err) {
        console.log(err)
      }
      if (settings) {
        res.send({ error: true })
      } else {
        let settings = {
          _id: mongoose.Types.ObjectId(),
          email: req.params.email,
          companies: [req.body.company],
          reddit: true,
          twitter: true,
          facebook: true,
          amazon: true,
          forbes: true,
          shopify: true,
          businessInsider: true
        }
        let settingsModel = new SettingsModel(settings);
        settingsModel.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        res.send({ error: false, settings })
      }
    })
})

router.put("/settings/:email", (req, res) => {

})

router.get("/settings/:email", (req, res) => {

})

router.delete("/settings/:email", (req, res) => {

})

module.exports = router;
