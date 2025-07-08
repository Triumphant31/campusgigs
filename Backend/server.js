const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Replace with your admin email and email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youradminemail@gmail.com',
        pass: 'yourapppassword' // Use App Password if 2FA is enabled
    }
});

app.post('/api/hire', async (req, res) => {
    const { service, details, location, contact } = req.body;

    const mailOptions = {
        from: 'youradminemail@gmail.com',
        to: 'youradminemail@gmail.com',
        subject: 'New Hire Request from Campus Gig',
        text: `Service: ${service}\nDetails: ${details}\nLocation: ${location}\nContact: ${contact}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Hire request sent to admin!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});