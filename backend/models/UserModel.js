const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    loginMethod: {
      type: String,
      enum: ["Google", "Github", "InApp"],
    },
  },
  { collection: "Users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
