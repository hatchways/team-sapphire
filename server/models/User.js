const mongoose = require("mongoose");
const connect = process.env.MONGO_URL;
const SettingsModel = require("./Settings");
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
  },
  settings: {
    type: Schema.Types.ObjectId,
    ref: 'setting'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
