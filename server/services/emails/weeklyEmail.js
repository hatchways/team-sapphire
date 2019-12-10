const Queue = require("bull");
const Arena = require("bull-arena");
const sgMail = require("@sendgrid/mail");
const MentionModel = require("../../models/Mention");
const { generateWeeklyEmailBody } = require("./emailHelper");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const weeklyEmailQueue = new Queue("weeklyEmailQueue", process.env.REDIS_AUTH);

weeklyEmailQueue.process(async (job, done) => {
  const { from, to, subject, text } = job.data;
  let d = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

  let response = await MentionModel.find({ date: { $gt: d } })
    .sort({ popularity: -1 })
    .limit(4);

  const message = {
    to,
    from,
    subject,
    text,
    html: await generateWeeklyEmailBody(response)
  };
  // sgMail.send(message);
  done(null, to);
});

weeklyEmailQueue.on("completed", async (job, result) => {
  console.log("email was sent to");
  console.log(result);
});

module.exports = { weeklyEmailQueue };
