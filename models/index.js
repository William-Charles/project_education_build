const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

let models = {};

models.User = require("./User");
models.Plan = require("./Plan");
models.Feature = require("./Feature");

module.exports = models;
