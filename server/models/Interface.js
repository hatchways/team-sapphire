const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");
const { getNewTweets } = require("./../routes/twitter");
const Mention = require("./Mention");

const mentionsInterface = class Interface {
  async getNewestMentions(companies) {
    let mentions = [];
    let promises = [];

    for (const company of companies) {
      promises.push(getNewestRedditPosts(company));
      promises.push(getNewTweets(company));
    }

    let platformPosts = await Promise.all(promises);
    for (const posts of platformPosts) {
      for(const post of posts){
        mentions.push(post);
      }
    }
    return mentions;
  }

  async getFilteredMentions(companies, platforms) {
    let allMentions = [];
    let platformQuery = [];
    platforms.forEach(platform => platformQuery.push({platform: platform}));
    for (const company of companies) {
      await Mention.find({ $and: [{company: company }, {$or: platformQuery}]}, (err, mentions) => {
        for(const mention of mentions){
          allMentions.push(mention);
        }
      });
    }
    return allMentions;
  }

  async getAllMentions(companies) {
    let allMentions = [];
    for (const company of companies) {
      await Mention.find({company: company }, (err, mentions) => {
        for(const mention of mentions){
          allMentions.push(mention);
        }
      });
    }
    return allMentions;
  }
};

module.exports = mentionsInterface;
