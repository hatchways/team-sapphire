const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MentionSchema = new Schema({
  company: String,
  platform: String,
  postId: String,
  userId: String,
  content: String,
  date: Number,
  link: String,
  image: String,
  popularity: Number,
  title: String,
  rating: Number
});

const Mention = mongoose.model("Mention", MentionSchema);

module.exports = Mention;
