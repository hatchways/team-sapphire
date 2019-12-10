const Queue = require("bull");
const Arena = require("bull-arena");
const sgMail = require("@sendgrid/mail");
const MentionModel = require("../../models/Mention");
const generateEmailBody = require("../emails/weeklyEmailHelper");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const weeklyEmailQueue = new Queue("weeklyEmailQueue", process.env.REDIS_AUTH);

weeklyEmailQueue.process(async (job, done) => {
  const { from, to, subject, text } = job.data;
  let response = await MentionModel.find();
  const message = {
    to,
    from,
    subject,
    text,
    html: "poop"
  };
  // sgMail.send(message);
  done(null, to);
});

weeklyEmailQueue.on("completed", async (job, result) => {
  console.log("email was sent to");
  console.log(result);
});

module.exports = { weeklyEmailQueue };
