const express = require("express");
const { submitDonation, getAllDonations } = require("../controller/donationcontroller");

const router = express.Router();

// Route: Submit Donation
router.post("/donate", submitDonation);
router.get("/list", getAllDonations);

module.exports = router;
