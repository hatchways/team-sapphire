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

router.get("/infinitescroll", jwtVerify, (req, res, next) => {
  const cursor = req.query.cursor;
  let mentions = [];
  for (let i=0; i<10; i++) {
    if (cursor.hasNext()) {
      cursor = cursor.next();
      mentions.push(cursor);
    }
  }
  res.send({ mentions });
});

module.exports = router;
