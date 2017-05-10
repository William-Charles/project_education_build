const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
  planId: {
    type: String
  },
  features: {
    type: []
  },
  price: {
    type: Number
  }
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;
