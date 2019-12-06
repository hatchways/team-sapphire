import Queue from "bull";
import Mention from "../../models/Mention";
const emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

const delayedEmailOptions = {};

const repeat = {
  every: 15000
};

const weeklyEmailOptions = {
  repeat
};
emailQueue.process(async job => {
  const result = {};

  return result;
});
//We use this promisified timeout to simulate async work
const mockAsync = number => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!number) reject(new Error("no first name"));
      resolve(number * 10);
    }, 5000);
  });
};
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
