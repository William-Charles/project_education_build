const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const expressHandlebars = require("express-handlebars");

// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")(req).then(() => next());
  }
});

// ----------------------------------------
// Body Parser
// ----------------------------------------
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// ----------------------------------------
// Express Session
// ----------------------------------------
app.use(
  expressSession({
    secret: process.env.secret || "puppies",
    saveUninitialized: false,
    resave: false
  })
);

// ----------------------------------------
// View
// ----------------------------------------
const helpers = require("./helpers");
var hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "main",
  helpers: helpers.registered
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ----------------------------------------
// Passport
// ----------------------------------------
let passport = require("./services/passports")(app);

// ----------------------------------------
// Routes
// ----------------------------------------
const authenticateRouter = require("./routes/authenticate")(passport);
app.use("/auth/", authenticateRouter);

// ----------------------------------------
// currentUser
// ----------------------------------------
app.use((req, res, next) => {
  if (req.user) res.locals.currentUser = req.user;
  next();
});

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const sparkRouter = require("./routes/spark");
app.use("/spark", sparkRouter);

const checkoutRouter = require("./routes/checkout");
app.use("/checkout", checkoutRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const teacherRouter = require("./routes/teacher");
app.use("/teacher", teacherRouter);

const vikingsRouter = require("./routes/vikings");
app.use("/vikings", vikingsRouter);

const editRouter = require("./routes/edit");
app.use("/edit", editRouter);

const communityRouter = require("./routes/community");
app.use("/community", communityRouter);
// ----------------------------------------
// Server
// ----------------------------------------
app.listen(process.env.PORT || 3000, () => {
  console.log("taking calls");
});
