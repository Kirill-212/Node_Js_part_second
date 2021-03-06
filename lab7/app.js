const express = require("express");
const passport = require("passport");

require("./passport");

const app = express();

//Configure Session Storage
const session = require("express-session")({
  resave: false,
  saveUninitialized: false,
  secret: "321",
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

//Unprotected Routes
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect("/login");
};

//Protected Route.
app.get("/resource", checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user._raw}   res</h1>`);
});

// Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/resource");
  }
);

//Logout
app.get("/logout", (req, res) => {
	
  req.session.logout = true;
  req.session.destroy(e => {
	  req.logout();
  res.redirect("/login");
  });
  
});

app.use(function (request, response) {
  response.sendStatus(404);
});
app.listen(3000);
