const express = require("express");
const router = express.Router();
const { GetUserByName } = require("../controllers/userController");
const requireAuth = require("../middleware/authMiddleware");

router.get("/info/:name",requireAuth, GetUserByName);

module.exports = router;