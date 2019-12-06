import Queue from "bull";
import sgMail from "@sendgrid/mail";

import Mention from "../../models/Mention";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

const data = {
  email: "foo@bar.com"
};

const delayedMsg = {
  to: user.username,
  from: "welcome@mentionscrawler.com",
  subject: "Interact with APP",
  text: "Interact with APP",
  html: "<strong>Interact with APP!</strong>"
};

const weeklyMsg = {
  to: user.username,
  from: "welcome@mentionscrawler.com",
  subject: "Weekly Report",
  text: "Weekly Report",
  html: "<strong>Weekly Report!</strong>"
};

emailQueue.add(data, options);

const delayedEmailOptions = { delay: 10000 };

const repeat = { every: 15000 };

const weeklyEmailOptions = { repeat };

// sgMail.send(delayedMsg);
// sgMail.send(weeklyMsg);

emailQueue.process(async job => {
  const result = {};

  return result;
});

//here you declared the actual job, what you want to do asynchronously
timeoutQueue.process(async (job, done) => {
  const result = await mockAsync(job.data.number);
  done(null, result);
});
//here you're adding a job to the queue and making it repeat at an interbal
timeoutQueue.add(
  { number: 4 },
  //Optional: you can give the job an id to be able to locate in the queue
  { jobId: "someId", repeat: { every: 1000 } }
); //repeat every n miliseconds
//Inside this listener, you define what you'll do with the result.
timeoutQueue.on("completed", async (job, result) => {
  console.log(
    "the job data was: ",
    job.data.number,
    "and this was the result ",
    result
  );
});
