const express = require("express");
const router = express.Router();
const { getNewestRedditPosts } = require("./reddit");

router.get("/newest", async (req, res, next) => {
  let mentions = [];
  for (const company of req.query.companies) {
    mentions = await getNewestRedditPosts(company);
  }
  if (mentions.length > 0) {
    res.send({ success: true, mentions });
  } else {
    next("No mentions available!");
  }
})

module.exports = router;
