const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");

const mentionsInterface = class Interface {
  async getNewestMentions(companies) {
    let mentions = {
      Reddit: []
    };

    let promises = [];

    for (const company of companies) {
      promises.push(getNewestRedditPosts(company));
    }

    let posts = await Promise.all(promises);

    for (const post of posts) {
      mentions[post[0].platform] = [...mentions[post[0].platform], ...post];
    }

    return mentions;
  }
};

module.exports = mentionsInterface;
