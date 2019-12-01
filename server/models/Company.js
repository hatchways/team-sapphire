const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  mentions: {
    reddit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mention"
      }
    ],
    twitter: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mention"
      }
    ]
  }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
