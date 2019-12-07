const express = require("express");
const router = express.Router();
const snoowrap = require("snoowrap");
const Mention = require("../models/Mention");

const r = new snoowrap({
  userAgent: "mentionscrawler",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// const getNewestRedditPosts = async (company) => {
//   let submissions = [];
//   await r.search({query: company, sort: 'new'})
//     .then(posts => {
//       posts.forEach((submission) => {
//         let image = "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png";
//         if (submission.thumbnail === "image") {
//           image = submission.url;
//         } else if (submission.thumbnail !== "default" && submission.thumbnail !== "self") {
//           image = submission.thumbnail;
//         }
//         submissions.push({
//           title: submission.title,
//           platform: "Reddit",
//           link: "https://www.reddit.com" + submission.permalink,
//           image,
//           desc: submission.selftext
//         });
//       });
//     });
//   return submissions;
// }

const getNewestRedditPosts = async company => {
  let submissions = [];
  let posts = await r.search({ query: company, sort: "new" });
  for (const post of posts) {
    await Mention.findOne({ postId: post.id }, async (err, mention) => {
      if (!mention) {
        let image =
          "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png";
        if (post.thumbnail === "image") {
          image = post.url;
        } else if (post.thumbnail !== "default" && post.thumbnail !== "self") {
          image = post.thumbnail;
        }
        let date = new Date(0);
        date.setUTCSeconds(post.created_utc);
        let newMention = new Mention({
          company: company,
          platform: "Reddit",
          postId: post.id,
          userId: post.author_fullname,
          content: post.selftext,
          date,
          link: "https://www.reddit.com" + post.permalink,
          image,
          popularity: post.ups + post.num_comments,
          title: post.title
        });
        await newMention.save((err, savedMention) => {
          submissions.push(savedMention);
        });
      }
    });
  }
  return submissions;
};

router.get("/posts/:company", async (req, res, next) => {
  let posts = await r.search({ query: req.params.company, sort: "popular" });
  res.send({ posts });
});

module.exports = { getNewestRedditPosts };
