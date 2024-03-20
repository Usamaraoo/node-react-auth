const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginWithGoolge,
} = require("../controllers/authController");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
const UserModal = require("../models/UserModel");

router.post("/register", register);

router.post("/login", login);
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  // res.json({ok:'ok'})
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ['email',"profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    // successReturnToOrRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL,
  }),
  loginWithGoolge
);

module.exports = router;
