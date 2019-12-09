const Queue = require("bull");
const Arena = require("bull-arena");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const Mention = require("../../models/Mention");
const User = require("../../models/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const delayedEmailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

// DELAYED EMAIL
const delayedMsg = {
  from: "welcome@mentionscrawler.com",
  subject: "Interact with APP",
  text: "Interact with APP",
  html: "<strong>Interact with APP!</strong>"
};
const delayedEmailOptions = { delay: 10000 };

// WEEKLY EMAIL
const weeklyMsg = {
  to: "ahanaghosh94@gmail.com",
  from: "welcome@mentionscrawler.com",
  subject: "Weekly Report",
  text: "Weekly Report",
  html: "<strong>Weekly Report!</strong>"
};
const repeat = { every: 60000 };
const weeklyEmailOptions = { repeat };

delayedEmailQueue.process(async (job, done) => {
  const { from, to, subject, text, html } = job.data;
  // const users = await User.find();
  // for (let user of users) {
  const message = {
    to,
    from,
    subject,
    text,
    html
  };
  sgMail.send(message);
  // }
  done(null, to);
});

// emailQueue.add(delayedMsg, delayedEmailOptions);
// emailQueue.add(weeklyMsg, weeklyEmailOptions);

delayedEmailQueue.on("completed", async (job, result) => {
  console.log("email was sent to");
  console.log(result);
});

module.exports = { delayedEmailQueue };
