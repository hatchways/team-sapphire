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

const getAndConditions = (companies, platforms, search) => {
  let andConditions = [];
  if (companies[0] !== "") {
    andConditions.push(getOrCondition(companies, "company"));
  }
  if (platforms[0] !== "") {
    andConditions.push(getOrCondition(platforms, "platform"));
  }
  if (search) {
    andConditions.push({ content: { $regex: search } });
  }
  return andConditions;
}

router.get("/searchbar", jwtVerify, (req, res, next) => {
  let andConditions = getAndConditions(req.query.companies, req.query.platforms, req.query.search);

  for (condition of andConditions) {
    console.log(condition);
  }
  Mention.find({})
         .and(andConditions)
         .exec((err, mentions) => {
           res.send({ mentions });
         })
});

router.get("/initial", jwtVerify, (req, res, next) => {
  let andConditions = getAndConditions(req.query.companies, req.query.platforms, req.query.search);

  const sort = req.query.sort;
  // { date: "descending" }
  // "-date"
  // { popularity: "descending" }
  // "-popularity"

  Mention.find({})
         .and(andConditions)
         .sort("-" + sort)
         .limit(10)
         .exec((err, mentions) => {
           res.send({ mentions });
         })
});

router.get("/infinitescroll", jwtVerify, (req, res, next) => {
  let andConditions = getAndConditions(req.query.companies, req.query.platforms, req.query.search);
  const sort = req.query.sort;
  const lastMention = req.query.lastMention;
  andConditions.push({ [sort]: { $lte: lastMention[sort] } });
  andConditions.push({ postId: { $ne: lastMention.postId } })
  // const skip = { $and: [
  //   [sort]: { $lte: lastMention[sort] },
  //   postId: { $ne: lastMention.postId }
  // ]};

  Mention.find({ $and: andConditions })
         .sort("-" + sort)
         .limit(10)
         .exec((err, mentions) => {
           res.send({ mentions });
         })
});

module.exports = router;
