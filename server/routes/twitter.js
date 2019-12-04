const express = require("express");
// const router = express.Router();
const Twitter = require("twitter");
const Mention = require("../models/Mention");

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

const newTweets = company => {
  let allTweets = [];
  client.get("search/tweets", { q: company, lang: 'en', result_type: 'popular' }, (error, tweets, response) => {
    tweets.statuses.forEach((tweet,i) => {
        Mention.findOne({ postId: tweet.id }, (err, mention) => {
          if (!mention) {
            let newMention = new Mention({
              company: company,
              platform: "Twitter",
              postId: tweet.id_str,
              userId: tweet.user.id,
              content: tweet.text,
              date: tweet.created_at,
              link: `twitter.com/i/web/status/${tweet.id_str}`,
              popularity: tweet.retweet_count + tweet.favorite_count
            });
            allTweets.push(newMention);
            newMention.save((err, mention)=>{
                console.log(allTweets);
            });
          }
        });
    });
  });
};

newTweets("Facebook");

// router.get("/search/new/:company", (req, res, next) => {
//   client.get(
//     "search/tweets",
//     { q: req.params.company, lang: 'en', result_type: 'mixed' },
//     (error, tweets, response) => {
//       let allTweets = [];
//       tweets.statuses.forEach(tweet => {
//         allTweets.push(tweet);
//       });
//       res.send({ success: true, tweets: allTweets });
//     }
//   );
// });

module.exports = newTweets;
