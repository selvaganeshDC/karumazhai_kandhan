const express = require("express");
const donation = require("../controller/donationcontroller");

const router = express.Router();

// Route: Submit Donation
router.post("/donate", donation.submitDonation);
router.get("/list", donation.getAllDonations);

module.exports = router;
