const app = require("express")();
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const { getCredential, verPassword } = require("./20-01m");
const session = require("express-session")({
  resave: false,
  saveUninitialized: false,
  secret: "321",
});

passport.use(
  new BasicStrategy((user, password, done) => {
    console.log(user + "  " + password);
    let rc = null;
    let cr = getCredential(user);
    if (!cr) rc = done(null, false, { message: "incorrect username" });
    else if (!verPassword(cr.password, password))
      rc = done(null, false, { message: "incorrect password" });
    else rc = done(null, user);
    return rc;
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/login",
  (req, res, next) => {
    if (req.session.logout && req.headers["authorization"]) {
      req.session.logout = false;
      delete req.headers["authorization"];
    }
    next();
  },
  passport.authenticate("basic"),
  (req, res) => {
    res.send("hello)))");
  }
);
app.get("/resource", function (req, res) {
  console.log(req.headers);
  console.log(req.session.logout);
  if (req.session.logout && req.headers["authorization"]) {
    return res.redirect("/login");
  }
  return res.send("hello res");
});
app.get("/logout", function (req, res) {
  req.session.logout = true;
  res.send("/logout");
});
app.use(function (request, response) {
  response.sendStatus(404);
});

app.listen(3000);
