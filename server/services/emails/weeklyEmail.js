const Queue = require("bull");
const Arena = require("bull-arena");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const weeklyEmailQueue = new Queue(
  "weeklyEmailQueue",
  "redis://127.0.0.1:6379"
);

weeklyEmailQueue.process(async (job, done) => {
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

weeklyEmailQueue.on("completed", async (job, result) => {
  console.log("email was sent to");
  console.log(result);
});

module.exports = { weeklyEmailQueue };
