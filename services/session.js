"use strict";

let Session = {};

Session.loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

Session.loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = Session;
