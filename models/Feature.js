const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  }
});

const Feature = mongoose.model("Feature", FeatureSchema);

module.exports = Feature;
