const express = require("express");
const router = express.Router();
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: '',
  clientId: '',
  clientSecret: '',
  refreshToken: ''
});

router.get("/search", (req, res, next) => {
  const search = r.getSubreddit('all').search({query: 'company', sort: 'new'});
  console.log(search);
});

module.exports = router;
