const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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

MentionSchema.plugin(mongoosePaginate);

const Mention = mongoose.model("Mention", MentionSchema);

module.exports = Mention;
