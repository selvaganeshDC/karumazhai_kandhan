const Donation = require("../model/donationmodel");

exports.submitDonation = async (req, res) => {
    try {
        const { name, amount, phone, place, address } = req.body;

        // Validate required fields
        if (!name || !amount || !phone || !place) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        // Store donation in the database
        const donation = await Donation.create({
            name,
            amount,
            phone,
            place,
            address: address || null, // Address is optional
        });

        return res.status(201).json({ 
            success: true, 
            message: "Thank you for your donation!", 
            data: donation 
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