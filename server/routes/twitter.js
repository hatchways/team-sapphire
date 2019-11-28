const express = require("express");
const router = express.Router();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
//   access_token_key: process.env.TWITTER_TOKEN,
//   access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

// CAN PARSE FOR LANGUAGE

router.get('/search/new/:company', (req, res, next) => {
    client.get('search/tweets', {q: req.params.company}, (error, tweets, response) => {
        let allTweets = [];
        tweets.statuses.forEach(tweet => {
            allTweets.push({
                text: tweet.text,
                user: tweet.user.screen_name,
                retweets: tweet.retweet_count
            })
        })
        res.send({ success: true, tweets: allTweets })
    });

})

module.exports = router;

