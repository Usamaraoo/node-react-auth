const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginWithGoolge,
  loginWithGithub,
} = require("../controllers/authController");
var passport = require("passport");

router.post("/register", register);

router.post("/login", login);

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
  res.json({ message: "user logout" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    // successReturnToOrRedirect: CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
  }),
  loginWithGoolge
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/callback/github",
//   passport.authenticate("github", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );
router.get(
  "/callback/github",
  passport.authenticate("github", {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }), loginWithGithub
);

module.exports = router;
