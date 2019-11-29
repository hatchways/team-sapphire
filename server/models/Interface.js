const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");

const interface = class Interface {
  getNewestMentions = async (companies) => {
    let mentions = [];
    let promises = [];
    for (const company of companies) {
      promises.push(getNewestRedditPosts(company));
    }
    await Promise
      .all(promises)
      .then(posts => {
        for (const post of posts) {
          mentions = mentions.concat(post);
        }
      })
    return mentions;
  }
}

module.exports = interface;
