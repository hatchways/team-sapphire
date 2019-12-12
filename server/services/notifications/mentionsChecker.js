const Queue = require("bull");
const Interface = require("./../../models/Interface");

require("dotenv").config();

const mentionNotification = new Queue(
  "mentionNotification",
  process.env.REDIS_AUTH
);

mentionNotification.process(async (job, done) => {
  const { companies, platforms } = job.data;
  let found = false;

  const mentionsInterface = new Interface();
  const mentions = await mentionsInterface.getNewestMentions(companies);
  Object.keys(mentions).forEach(mention => {
    if (mentions[mention].length > 0) {
      found = true;
    }
  });

  done(null, found);
});

module.exports = { mentionNotification };
