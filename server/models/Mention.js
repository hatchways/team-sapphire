const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MentionSchema = new Schema({
  company: String,
  platform: String,
  postId: String,
  userId: String,
  content: String,
  date: String,
  link: String,
  popularity: Number
});

const Mention = mongoose.model("Mention", MentionSchema);

module.exports = Mention;
