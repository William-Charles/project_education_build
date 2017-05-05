const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  facebookId: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  passwordHash: {
    type: String
  },
  bestPull: {
    type: Number,
    default: 0
  },
  bestPush: {
    type: Number,
    default: 0
  },
  bestMin: {
    type: Number,
    default: 99999
  },
  bestSec: {
    type: Number,
    default: 0
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

UserSchema.statics.findOrCreateFacebook = function(profile, req) {
  if (req.user) {
    return updateUser(profile, req.user);
  }
  return User.findOne({
    facebookId: profile.id
  }).then(user => {
    if (user) {
      return user;
    } else {
      let nameArr = profile.displayName.split(" ");
      return new User({
        fname: nameArr[0],
        lname: nameArr[1],
        facebookId: profile.id,
        email: profile.emails[0].value,
        picture: profile.photos[0].value
      }).save();
    }
  });
};

function updateUser(profile, user) {
  return User.findByIdAndUpdate(user._id, {
    $set: { facebookId: profile.id }
  }).catch(err => {
    console.log(err);
  });
}

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
