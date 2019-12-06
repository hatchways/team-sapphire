const Queue = require("bull");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const Mention = require("../../models/Mention");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

// DELAYED EMAIL
const delayedMsg = {
  to: "ahanaghosh94@gmail.com",
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
const repeat = { every: 15000 };
const weeklyEmailOptions = { repeat };

const mockAsync = number => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!number) reject(new Error("no first name"));
      resolve(number * 10);
    }, 1000);
  });
};

emailQueue.process(async (job, done) => {
  const result = await mockAsync(1);
  done(null, result);
});

emailQueue.add(delayedMsg, delayedEmailOptions);
// emailQueue.add(weeklyMsg, weeklyEmailOptions);

emailQueue.on("completed", async (job, result) => {
  console.log("email was sent");
  // console.log(result);
  sgMail.send(delayedMsg);
  // sgMail.send(weeklyMsg);
});