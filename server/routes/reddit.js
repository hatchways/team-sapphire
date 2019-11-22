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
  r.getSubreddit('all')
    .search({query: 'company', sort: 'new'})
    .then(console.log)
});

module.exports = router;
