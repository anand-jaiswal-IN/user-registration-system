var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const createUser = require("../models/createUser");
const createLogin = require("../models/createLogin");

router.use((req, res, next) => {
  if (req.session && req.session.user) res.redirect("/");
  else next();
});

router.get("/signup", function (req, res, next) {
  res.render("users/signup", { title: "Sign Up", message: req.query.message });
});

router.post("/signup", async function (req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  createUser({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  })
    .then((result) => {
      res.redirect(
        `/users/login?message=Signup%20successful.%20Please%20login%20to%20continue.`
      );
    })
    .catch((err) => {
      res.redirect(`/users/signup?message=Internal.%20server error.%20Try Again`);
    });
});

router.get("/login", function (req, res, next) {
  res.render("users/login", { title: "Login", message: req.query.message });
});

router.post("/login", function (req, res, next) {
  createLogin({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  })
    .then((result) => {
      req.session.user = result;
      res.redirect(
        `/?message=Logged in successfully with username=${req.session.user.username}`
      );
    })
    .catch((err) => {
      res.redirect(`/users/login?message=${err}`);
    });
});

module.exports = router;
