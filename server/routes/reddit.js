const snoowrap = require("snoowrap");
const Mention = require("../models/Mention");
const Sentiment = require("sentiment")

const sentiment = new Sentiment();
const r = new snoowrap({
  userAgent: "mentionscrawler",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

const getNewMention = async (post, company) => {
  let image =
    "https://images-eu.ssl-images-amazon.com/images/I/418PuxYS63L.png";
  if (post.thumbnail === "image") {
    image = post.url;
  } else if (post.thumbnail !== "default" && post.thumbnail !== "self") {
    image = post.thumbnail;
  }
  let date = new Date(0);
  date.setUTCSeconds(post.created_utc);
  date = Math.floor(date.getTime()/1000);
  let rating = await sentiment.analyze(post.selftext);
  rating = rating.comparative;
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
    title: post.title,
    rating
  });
  return newMention;
}

const getRedditPosts = async (company, sort, time) => {
  let submissions = [];
  let posts = await r.search({ query: company, sort, time });
  for (const post of posts) {
    await Mention.findOne({ postId: post.id }, async (err, mention) => {
      if (!mention) {
        let newMention = await getNewMention(post, company);
        await newMention.save((err, savedMention) => {
          submissions.push(savedMention);
        });
      }
    });
  }
  return submissions;
};

module.exports = { getRedditPosts };
