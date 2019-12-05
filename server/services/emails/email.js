import Queue from "bull";
const emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

const delayedEmailOptions = {};

const repeat = {
  every: 15000
};

const weeklyEmailOptions = {
  repeat
};
