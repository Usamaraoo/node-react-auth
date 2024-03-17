const UserModal = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const token = jwt.sign(
        { name: getUser.name, email: getUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "2m" }
      );
      res.cookie("token", jwt, {
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
    // res.json(error);
  }
};

module.exports = {
  login,
  register,
};
