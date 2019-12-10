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

router.get("/pagination", jwtVerify, (req, res, next) => {
  let andConditions = getAndConditions(req.query.companies, req.query.platforms, req.query.search);

  const sortBy = req.query.sortBy;
  // date or popularity
  const page = req.query.page;
  //Math.floor(mentions / 10) + 1
  const options = {
    page,
    limit: 10,
    sort: { [sortBy]: -1 },
  };
  const query = { $and: andConditions };

  Mention.paginate(query, options, (err, mentions) => {
    res.send({ mentions: mentions.docs, hasNextPage: mentions.hasNextPage, page: mentions.page });
  });
});

module.exports = router;
