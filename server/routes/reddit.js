const express = require("express");
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'mentionscrawler',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

const getNewestRedditPosts = async (company) => {
  let submissions = [];
  await r.search({query: company, sort: 'new'})
    .then(posts => {
      posts.forEach((submission, i) => {
        submissions.push({
          title: submission.title,
          platform: submission.subreddit_name_prefixed,
          link: "https://www.reddit.com" + submission.permalink,
          image: (submission.thumbnail !== "default" && submission.thumbnail !== "self") ? submission.thumbnail : "https://zdnet2.cbsistatic.com/hub/i/r/2016/05/27/c16d537c-b457-4d84-9b88-8e97ede57180/thumbnail/770x578/f0b848edb037a70d6e0821c061087214/screen-shot-2016-05-27-at-09-25-51.jpg",
          desc: submission.selftext
        });
      });
    });
  return submissions;
}

module.exports = {
  getNewestRedditPosts
};
