const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  displayName: {
    type: String
  },
  facebookId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  passwordHash: {
    type: String
  },
  bestPull: {
    type: Number
  },
  bestPush: {
    type: Number
  },
  bestMile: {
    type: Number
  },
  workouts: [],
  picture: {
    type: String
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8);
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.statics.findOrCreateFacebook = function(profile) {
  console.log(profile);
  return User.findOne({
    facebookId: profile.id
  }).then(user => {
    if (user) {
      return user;
    } else {
      return new User({
        displayName: profile.displayName,
        facebookId: profile.id,
        email: profile.emails[0].value,
        picture: profile.photos[0].value
      }).save();
    }
  });
};

UserSchema.methods.getAccounts = async function() {
  let accounts = [];
  accounts.push({
    name: "Facebook",
    authorized: this.facebookId
  });
  return accounts;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
