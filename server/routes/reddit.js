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
      posts.forEach((submission) => {
        let image = "https://a.thumbs.redditmedia.com/9EDGp3AsLDtCRvDUAjuQzNQSZPkvVmgesMjVxphosb0.jpg";
        if (submission.thumbnail === "image") {
          image = submission.url;
        } else if (submission.thumbnail !== "default" && submission.thumbnail !== "self") {
          image = submission.thumbnail;
        }
        submissions.push({
          title: submission.title,
          platform: "Reddit",
          link: "https://www.reddit.com" + submission.permalink,
          image,
          desc: submission.selftext
        });
      });
    });
  return submissions;
}

module.exports = {
  getNewestRedditPosts
};
