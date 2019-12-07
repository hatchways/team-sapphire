const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");
const { getNewTweets } = require("./../routes/twitter");

const interface = class Interface {
  async getNewestMentions(companies) {
    let mentions = {
      Reddit: [],
      Twitter: []
    };

    let promises = [];

    for (const company of companies) {
      promises.push(getNewestRedditPosts(company));
      promises.push(getNewTweets(company));
    }

    let posts = await Promise.all(promises);
    console.log(posts);
    for (const post of posts) {
      mentions[post[0].platform] = [...mentions[post[0].platform], ...post];
    }
    return mentions;
  }
};

module.exports = interface;
