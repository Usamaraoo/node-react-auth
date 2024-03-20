// express
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./utils/passport")

require("dotenv/config"); // configure reading from .env
// local
const authApies = require("./routes/authApi");
const userApies = require("./routes/userApi");

//constant
const port = process.env.PORT;
const uri = process.env.MONGOURI;
const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(
  cookieSession({name:"session", keys:["openreplay"], maxAge: 0,})
);

app.use(passport.initialize());
app.use(passport.session());


// apies
app.use("/api/auth", authApies);
app.use("/api/user", userApies);

try {
  mongoose.connect(uri);
  console.log("connected");
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
