// const { keys } = require('./key.cjs');

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');


const app = express();
const port = 3000;



    /** Appointment Remainder template */
    const   contentSid0 =  'HXb5b62575e6e4ff6129ad7c8efe1f983e';
  
    /** Order notification template */
    const   contentSid1 =  'HX350d429d32e64a552466cafecbe95f3c';
  
    /** Verification template */
    const  contentSid2 =  'HX229f5a04fd0510ce1b071852155d3e75';
  
    /** Custom template */
    const    contentSid3 =  'HX3309112c58d09f9ae4761bbb5086abaa';
  


const accountSid = 'ACba5033e9b3aefd784a645fc2639d1ba1';
const authToken = 'db834e6691443f285fec43eddf9005f9';
const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());

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

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});