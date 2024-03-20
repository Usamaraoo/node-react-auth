const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
require("dotenv/config"); // configure reading from .env


passport.use(
    new GoogleStrategy(
  {
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret:  process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: "/api/auth/redirect/google",
  },
  function (accessToken, refreshToken, profile, done) {
    // console.log('profile',profile);
    done(null,profile );
  }
 )
);


passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});