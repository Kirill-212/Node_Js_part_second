const app = require("express")();
const passport = require("passport");
const DigestStrategy = require("passport-http").DigestStrategy;
const { getCredential, verPassword } = require("./20-01m");
const session = require("express-session")({
  resave: false,
  saveUninitialized: false,
  secret: "123",
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new DigestStrategy(
    { qop: "auth" },
    (user, done) => {
      let rc = null;
      let cr = getCredential(user);
      if (!cr) rc = done(null, false);
      else rc = done(null, cr.users, cr.password);
      return rc;
    },
    (params, done) => {
      done(null, true);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app
  .get(
    "/login",
    (req, res, next) => {
      if (req.session.logout && req.headers["authorization"]) {
        req.session.logout = false;

        delete req.headers["authorization"];
      }

      next();
    },
    passport.authenticate("digest", { session: false }),
    (req, res, next) => {
      if (req.session.logout == undefined) req.session.logout = false;
      next();
    }
  )

  .get("/login", (req, res) => {
    res.end("hello");
  });

app.get("/logout", (req, res) => {
  req.session.logout = true;
  delete req.headers["authorization"];
  res.end("/logout");
});

app.get("/resource", (req, res) => {
  if (req.session.logout == false && req.headers["authorization"])
    res.end("hello res");
  else res.redirect("/login");
});
app.use(function (request, response) {
  response.sendStatus(404);
});

app.listen(3000);
