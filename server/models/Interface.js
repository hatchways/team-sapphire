const express = require("express");
const { getNewestRedditPosts } = require("./../routes/reddit");

const interface = class Interface {
  constructor() {
    this.mentions = []
  }

  getNewestMentions = async (companies) => {
    for (const company of companies) {
      this.mentions = await getNewestRedditPosts(company);
    }
    return this.mentions;
  }
}

module.exports = interface;
