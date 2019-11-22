const express = require("express");
const router = express.Router();
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'mentionscrawler',
  clientId: 'zib4JtksPnuuTQ',
  clientSecret: 'CgQwwVAhymykGF4W5-LtQgBgeSw',
  refreshToken: '27776375-KsPMTA18nr9euoXz9ZuJwu6FIuU',
  accessToken: '27776375-0sx19eJqWpqnbQ_L2Ac-lwqp150'
});

const search = r.getSubreddit('all').search({query: 'company', sort: 'new'});
console.log(search);

router.get("/search", (req, res, next) => {
  const search = r.getSubreddit('all').search({query: 'company', sort: 'new'});
  console.log(search);
});

module.exports = router;
