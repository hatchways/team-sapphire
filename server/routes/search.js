const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mention = require("./../models/Mention");
const Company = require("./../models/Company");
const { jwtVerify } = require("../utils/authUtils");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

router.post("/filter", jwtVerify, async (req, res, next) => {
  let query = { $query: {$or: []} };
  if (req.body.company) {
    req.body.company.forEach(comp => query.$query.$or.push({ "company": comp }));
  }
  if (req.body.platform) {
    req.body.platform.forEach(plat => query.$query.$or.push({ "platform": plat }));
  }
  const mentions = await Mention.find(query).sort({ date: 1});
  res.send({success: true, mentions});
});

module.exports = router;
