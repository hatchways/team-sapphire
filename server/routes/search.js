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

const getOrCondition = (items, name) => {
  if (items.length === 1 && items[0] !== "") {
    return { [name]: items[0] };
  } else if (items.length > 1) {
    let orConditions = {
      $or: []
    };
    for (const item of items) {
      orConditions.$or.push({ [name]: item });
    }
    return orConditions;
  }
}

router.get("/searchbar", jwtVerify, (req, res, next) => {
  const companies = req.query.companies;
  const platforms = req.query.platforms;
  const search = req.query.search;
  let andConditions = [];

  if (companies[0] !== "") {
    andConditions.push(getOrCondition(companies, "company"));
  }
  if (platforms[0] !== "") {
    andConditions.push(getOrCondition(platforms, "platform"));
  }
  andConditions.push({ content: { $regex: search } });

  for (condition of andConditions) {
    console.log(condition);
  }
  Mention.find({})
         .and(andConditions)
         .exec((err, mentions) => {
           res.send({ mentions });
         })
});

module.exports = router;
