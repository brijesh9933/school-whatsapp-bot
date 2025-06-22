// const { keys } = require('./key.cjs');

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;




/** Appointment Remainder template */
const contentSid0 = '';

/** Order notification template */
const contentSid1 = '';

/** Verification template */
const contentSid2 = '';

/** Custom template */
const contentSid3 = '';

const accountSid = '';


const authToken = '';
const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this to handle Twilio's default format

// API endpoint to send WhatsApp message
app.post('/send-message', async (req, res) => {
    const { to, contentSid, contentVariables } = req.body;

    if (!to || !contentSid || !contentVariables) {
        return res.status(400).json({ error: 'Missing required fields: "to", "contentSid", or "contentVariables"' });
    }

    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio WhatsApp sandbox number
            contentSid: contentSid,
            contentVariables: contentVariables,
            to: `whatsapp:${to}`
        });

        res.status(200).json({ success: true, sid: message.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



// Webhook endpoint to handle incoming WhatsApp messages
// app.post('/webhook', (req, res) => {
//     const { From, Body } = req.body; // Extract sender and message content

//     console.log(`Message received from ${From}: ${Body}`);

//     // Example: Respond to the incoming message
//     client.messages
//         .create({
//             from: 'whatsapp:+14155238886', // Twilio WhatsApp sandbox number
//             to: From,
//             body: `You said: ${Body}`,
//         })
//         .then(() => {
//             res.status(200).send('Message processed');
//         })
//         .catch((error) => {
//             console.error('Error sending response:', error);
//             res.status(500).send('Failed to process message');
//         });
// });

// Webhook endpoint to handle incoming WhatsApp messages
app.post('/webhook', (req, res) => {
    console.log('Incoming request body:', req.body); // Log the entire request body
    const { From, Body } = req.body;

    if (!From || !Body) {
        console.error('Invalid request: Missing From or Body');
        return res.status(400).send('Invalid request');
    }

    console.log(`Message received from ${From}: ${Body}`);
    res.status(200).send('Webhook received');
});


// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});