const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  _id: Schema.ObjectId,
  email: String,
  companies: [],
  reddit: Boolean,
  twitter: Boolean,
  facebook: Boolean,
  amazon: Boolean,
  forbes: Boolean,
  shopify: Boolean,
  businessInsider: Boolean
});

const SettingsModel = mongoose.model('setting', SettingSchema);

module.exports = SettingsModel;
