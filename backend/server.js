// express
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv/config"); // configure reading from .env
// local
const authApies = require("./routes/authApi");

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

// apies
app.use("/api/auth", authApies);

try {
  mongoose.connect(uri);
  console.log("connected");
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
