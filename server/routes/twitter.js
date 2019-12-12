const Twitter = require("twitter");
const Mention = require("../models/Mention");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

const getNewTweets = async company => {
  let allTweets = [];
  const tweets = await client.get("search/tweets", {
    q: company,
    lang: "en",
    result_type: "mixed"
  });
  tweets.statuses = tweets.statuses.filter(
    tweet => tweet.text.slice(0, 2) !== "RT"
  );
  for (const tweet of tweets.statuses) {
    await Mention.findOne({ postId: tweet.id_str }, async (err, mention) => {
      if (!mention) {
        let date = Math.floor(new Date(tweet.created_at).getTime() / 1000);
        let rating = await sentiment.analyze(tweet.text);
        rating = rating.comparative;
        let newMention = new Mention({
          company: company,
          platform: "Twitter",
          postId: tweet.id_str,
          userId: tweet.user.id,
          content: tweet.text,
          date,
          link: `https://www.twitter.com/i/web/status/${tweet.id_str}`,
          image:
            tweet.entities.media &&
            tweet.extended_entities.media.type === "photo"
              ? tweet.extended_entities.media.media_url
              : "https://cdn2.iconfinder.com/data/icons/minimalism/512/twitter.png",
          popularity: tweet.retweet_count + tweet.favorite_count,
          title:
            tweet.text
              .split(" ")
              .slice(0, 5)
              .join(" ") + "...",
          rating
        });
        await newMention.save((err, savedMention) => {
          allTweets.push(savedMention);
        });
      }
    });
  }
  return allTweets;
};

module.exports = { getNewTweets };
