const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  _id: Schema.ObjectId,
  email: String,
  companies: [String],
  platforms: Object
});

const SettingsModel = mongoose.model('setting', SettingSchema);

module.exports = SettingsModel;
