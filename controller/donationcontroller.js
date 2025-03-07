const axios = require("axios");
const Donation = require("../model/donationmodel");
require("dotenv").config();

exports.submitDonation = async (req, res) => {
    try {
        const { name, amount, phone, email, address } = req.body;

        // Validate required fields
        if (!name || !amount || !phone || !email) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        // Store donation in the database
        const donation = await Donation.create({
            name,
            amount,
            phone,
            email,
            address: address || null, // Address is optional
        });

        // Format phone number: Ensure it includes country code (e.g., 91 for India)
        let formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

        // WhatsApp message content
        const message = `🙏 கருமலை கந்தவேலர் திருக்கோயில் 🙏\n\nஅன்பார்ந்த ${name},\n💖 உங்கள் ₹${amount} நன்கொடைக்கு மனமார்ந்த நன்றி! \n✨ உங்கள் தொண்டு மற்றும் ஆதரவுக்கு மிக்க நன்றி. 🌟`;

        // WhatsApp API URL
        const whatsappApiUrl = `http://wapi.msgpedia.com/wapp/api/send?apikey=de45773ebe7c48008aaad8b10951a6b0&mobile=${formattedPhone}&msg=${encodeURIComponent(message)}`;

        // Send WhatsApp message
        const response = await axios.get(whatsappApiUrl);
        console.log("WhatsApp API Response:", response.data);

        return res.status(201).json({ 
            success: true, 
            message: "Thank you for your donation! A confirmation has been sent via WhatsApp.", 
            data: donation,
            whatsappResponse: response.data  // Send response to frontend for debugging
        });

    } catch (error) {
        console.error("Error submitting donation:", error);
        return res.status(500).json({ success: false, message: "Failed to submit donation." });
    }
};


exports.getAllDonations = async (req, res) => {
    try {
        // Fetch all donations, sorted by most recent first
        const donations = await Donation.findAll({
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ 
            success: true, 
            donations: donations 
        });
    } catch (error) {
        console.error("Error fetching donations:", error);
        return res.status(500).json({ success: false, message: "Failed to retrieve donations." });
    }
};