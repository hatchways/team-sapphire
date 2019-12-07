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

router.get("/searchbar", jwtVerify, (req, res, next) => {
  const companies = req.query.companies;
  const platforms = req.query.platforms;
  const search = req.query.search;
  let andConditions = [];

  if (companies.length === 1 && platforms[0] !== "") {
    andConditions.push({ company: companies[0] });
  } else if (companies.length > 1) {
    let orConditions = {
      $or: []
    };
    for (const company of companies) {
      orConditions.$or.push({ company });
    }
    andConditions.push(orConditions);
  }

  if (platforms.length === 1 && platforms[0] !== "") {
    andConditions.push({ platform: platforms[0] });
  } else if (platforms.length > 1) {
    let orConditions = {
      $or: []
    };
    for (const platform of platforms) {
      orConditions.$or.push({ platform });
    }
    andConditions.push(orConditions);
  }

  andConditions.push({ content: { $regex: search } });
  console.log(andConditions);
  Object.keys(andConditions).forEach(condition => {
    console.log(andConditions[condition]);
  })
  Mention.findAll()
         .and(andConditions)
         .exec((err, mentions) => {
           console.log(mentions);
         })
});

module.exports = router;
