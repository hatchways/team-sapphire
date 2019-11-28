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
          image: (submission.thumbnail !== "default" && submission.thumbnail !== "self") ? submission.thumbnail : "",
          desc: submission.selftext
        });
      });
    });
  return submissions;
}

module.exports = {
  getNewestRedditPosts
};
