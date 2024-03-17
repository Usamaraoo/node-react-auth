const UserModal = require("../models/UserModel");

const GetUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await UserModal.findOne({ name });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: "Couldn't find the user" });
    }
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = {
  GetUserByName,
};
