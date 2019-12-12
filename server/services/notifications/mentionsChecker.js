const Queue = require("bull");

require("dotenv").config();

const mentionNotification = new Queue(
  "mentionNotification",
  process.env.REDIS_AUTH
);

mentionNotification.process(async (job, done) => {
  const { test } = job.data;

  done(null, to);
});

mentionNotification.on("completed", async (job, result) => {
  console.log(result);
});

module.exports = { mentionNotification };
