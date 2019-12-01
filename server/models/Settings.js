const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  _id: Schema.ObjectId,
  email: String,
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  ],
  platforms: Object
});

const SettingsModel = mongoose.model("setting", SettingSchema);

module.exports = SettingsModel;
