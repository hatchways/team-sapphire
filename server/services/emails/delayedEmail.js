const Queue = require("bull");
const Arena = require("bull-arena");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const delayedEmailQueue = new Queue(
  "delayedEmailQueue",
  "redis://127.0.0.1:6379"
);

delayedEmailQueue.process(async (job, done) => {
  const { from, to, subject, text, html } = job.data;
  const message = {
    to,
    from,
    subject,
    text,
    html
  };
  // sgMail.send(message);
  done(null, to);
});

delayedEmailQueue.on("completed", async (job, result) => {
  console.log("email was sent to");
  console.log(result);
});

module.exports = { delayedEmailQueue };
