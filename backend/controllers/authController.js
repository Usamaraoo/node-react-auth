const UserModal = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJwt = require("../utils/createJwt");
require("dotenv/config"); // configure reading from .env

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await UserModal.findOne({ email: email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    }
    if ((name, email, password)) {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModal.create({
        name,
        email,
        password: bcryptPassword,
      });
      res.status(201).json({ newUser, message: "New user registered" });
    } else {
      res
        .status(400)
        .json({ message: "Name, Email or Password field missing" });
    }
  } catch (error) {
    console.log("err", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email or Password field missing" });
    }
    // query user by email
    const getUser = await UserModal.findOne({ email });
    if (!getUser) {
      res.status(400).json({ message: "User doesn't exist" });
    }
    const match = await bcrypt.compare(password, getUser.password);
    if (match) {
      const token = createJwt({
        name: getUser.name,
        email: getUser.email,
        loginMethod: "InApp",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "user login", user: getUser, token });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log("err", error);
  }
};

// will create or login user
const loginWithGoolge = async (req, res) => {
  const user = req.user;
  const getUser = await UserModal.findOne({ email: user._json.email });
  if (!getUser) {
    const newUser = await UserModal.create({
      name: user.displayName,
      email: user._json.email,
      image: user._json.picture,
      loginMethod: "Google",
    });
    const token = createJwt({
      name: newUser.email,
      email: newUser.name,
      image: user._json.picture,
      loginMethod: "Google",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  } else if (getUser.loginMethod === "Google") {
    const token = createJwt({
      name: getUser.email,
      email: getUser.name,
      image: user._json.picture,
      loginMethod: "Goolge",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  } else {
    req.logout();
    res
      .status(401)
      .json({ message: "user already exists with other social acount" });
  }
};

const loginWithGithub = async (req, res) => {
  try {
    const user = req.user;
    const getUser = await UserModal.findOne({ email: user._json.email });
    // if new user
    if (!getUser) {
      const newUser = await UserModal.create({
        name: user.displayName,
        email: user._json.email,
        image: user._json.avatar_url,
        loginMethod: "Github",
      });
      const token = createJwt({
        name: newUser.email,
        email: newUser.name,
        image: user._json.avatar_url,
        loginMethod: "Github",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    } else if (getUser.loginMethod === "Github") {
      const token = createJwt({
        name: getUser.email,
        email: getUser.name,
        image: user._json.avatar_url,
        loginMethod: getUser.loginMethod,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    } else {
      req.logout();

      res
        .status(401)
        .json({ message: "user already exists with other social acount" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
  loginWithGoolge,
  loginWithGithub,
};
