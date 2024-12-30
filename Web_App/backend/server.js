const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock OTP storage (in-memory)
const otpData = {};

// Endpoint to generate OTP
app.post("/generate-otp", (req, res) => {
    const { contact } = req.body;
    if (!contact) return res.status(400).send({ error: "Contact is required." });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    otpData[contact] = { otp, expiresAt: Date.now() + 120000 }; // Store OTP for 2 minutes

    console.log(`OTP for ${contact}: ${otp}`); // Log OTP for testing (remove in production)
    return res.send({ message: "OTP sent successfully." });
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
    const { contact, otp } = req.body;
    const record = otpData[contact];

    if (!record) return res.status(400).send({ error: "Invalid or expired OTP." });
    if (record.otp != otp) return res.status(400).send({ error: "Incorrect OTP." });
    if (Date.now() > record.expiresAt) {
        delete otpData[contact];
        return res.status(400).send({ error: "OTP has expired." });
    }

    delete otpData[contact]; // Clear OTP after successful verification
    return res.send({ message: "OTP verified successfully." });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
