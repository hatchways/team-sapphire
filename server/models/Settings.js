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
  platforms: {
    type: Object,
    default: {
      Reddit: true,
      Twitter: true,
      "The New York Times": true,
      Amazon: true,
      Forbes: true,
      Shopify: true,
      "Business Insider": true
    }
  },
  subscribed: {
    type: Boolean,
    default: true
  }
});

const SettingsModel = mongoose.model("setting", SettingSchema);

module.exports = SettingsModel;
