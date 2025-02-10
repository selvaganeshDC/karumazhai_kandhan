const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./config/db.js');
require('dotenv').config(); 
const donationRoutes = require("./routes/donationroutes.js");
const adminlogin = require("./routes/adminroute.js");
const bcrypt = require('bcryptjs');
const app = express();


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors({ 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow credentials if needed
}));

(async () => {
    try {
        await db.sync({ alter: true }); 
        console.log('✅ Database synchronized successfully.');
    } catch (error) {
        console.error('❌ Error syncing database:', error);
    }
})();

// async function hashPassword(password) {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     return hashedPassword;
// }

// hashPassword("Kandhan@123").then(console.log);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use("/api/donations", donationRoutes);
app.use("/api/login", adminlogin);
// Listen on the port from the .env file
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
