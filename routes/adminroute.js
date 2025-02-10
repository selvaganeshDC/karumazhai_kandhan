const express = require("express");
const { loginUser } = require("../controller/admincontroller");

const router = express.Router();

// Route: Submit Donation
router.post("/adminlogin", loginUser);

module.exports = router;