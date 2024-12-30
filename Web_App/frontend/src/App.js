import React, { useState } from "react";
import axios from "axios";

function App() {
    const [contact, setContact] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const requestOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/generate-otp", { contact });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error generating OTP.");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { contact, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error verifying OTP.");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>OTP Verification</h1>
            <input
                type="text"
                placeholder="Enter email or phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={{ display: "block", marginBottom: "10px", padding: "8px" }}
            />
            <button onClick={requestOtp} style={{ padding: "8px", marginBottom: "10px" }}>
                Request OTP
            </button>
            <br />
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ display: "block", marginBottom: "10px", padding: "8px" }}
            />
            <button onClick={verifyOtp} style={{ padding: "8px" }}>
                Verify OTP
            </button>
            <p>{message}</p>
        </div>
    );
}

export default App;
