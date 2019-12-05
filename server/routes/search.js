const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mention = require("./../models/Mention");
const Company = require("./../models/Company");
const { jwtVerify } = require("../utils/authUtils");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

router.get("/filter", jwtVerify, (req, res, next) => {
  let query = {};
  if (req.body.company) query.company = req.body.company;
  if (req.body.platform) query.platform = req.body.platform;
  if (req.body.author) query.author = req.body.author;
  if (req.body.content) query.content = req.body.content;
  Mention.find(query, (err, mentions) => {
    res.send({ mentions });
  });
});

module.exports = router;
