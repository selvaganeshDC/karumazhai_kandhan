const express = require("express");
const { loginUser, registerUser } = require("../controller/admincontroller");

const router = express.Router();

// Route: Submit Donation
router.post("/adminlogin", loginUser);

router.post("/adminregister", registerUser);
module.exports = router;