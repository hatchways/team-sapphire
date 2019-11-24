const express = require("express");
const router = express.Router();
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'mentionscrawler',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

router.get("/search/new/:company", (req, res, next) => {
  r.search({query: req.params.company, sort: 'new'})
    .then(posts => {
      let submissions = [];
      posts.forEach((submission, i) => {
        console.log(submission.title);
        console.log(submission.subreddit_name_prefixed);
        console.log(submission.permalink);
        console.log(submission.thumbnail);
        console.log(submission.selftext);
        submissions.push({
          title: submission.title,
          platform: submission.subreddit_name_prefixed,
          link: submission.permalink,
          image: submission.thumbnail,
          desc: submission.selftext
        });
      });
      res.send({ success: true, submissions });
    });
});

module.exports = router;
