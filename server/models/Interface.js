const express = require("express");
const { getNewestRedditPosts } = require("./reddit");

const interface = class Interface {
  constructor() {
    this.mentions = []
  }

  getNewestMentions = (companies) => {
    for (const company of companies) {
      this.mentions = await getNewestRedditPosts(company);
    }
    return this.mentions;
  }
}

module.exports = interface;
