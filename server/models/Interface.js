const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");

const interface = class Interface {
  getNewestMentions = async (companies) => {
    let mentions = {
      Reddit: []
    };
    let promises = [];
    for (const company of companies) {
      promises.push(getNewestRedditPosts(company));
    }
    await Promise
      .all(promises)
      .then(posts => {
        for (const post of posts) {
          if (post[0].src === "Reddit") {
            mentions.Reddit = mentions.Reddit = post;
          }

        }
      })
    return mentions;
  }
}

module.exports = interface;
