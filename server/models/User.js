const mongoose = require("mongoose");
const connect = process.env.MONGO_URL;
const Schema = mongoose.Schema;

mongoose.connect(connect, { useNewUrlParser: true });

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
