// /// const { keys } = require('./key.cjs');

// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');


// const app = express();
// const port = 3000;



//     /** Appointment Remainder template */
//     const   contentSid0 =  '';
  
//     /** Order notification template */
//     const   contentSid1 =  '';
  
//     /** Verification template */
//     const  contentSid2 =  '';
  
//     /** Custom template */
//     const    contentSid3 =  '';
  


// const accountSid = '';
// const authToken = '';
// const client = twilio(accountSid, authToken);

// // Middleware
// app.use(bodyParser.json());

// // API endpoint to send WhatsApp message
// app.post('/send-message', async (req, res) => {
//     const { to, contentSid, contentVariables } = req.body;

//     if (!to || !contentSid || !contentVariables) {
//         return res.status(400).json({ error: 'Missing required fields: "to", "contentSid", or "contentVariables"' });
//     }

//     try {
//         const message = await client.messages.create({
//             from: 'whatsapp:+14155238886', // Twilio WhatsApp sandbox number
//             contentSid: contentSid,
//             contentVariables: contentVariables,
//             to: `whatsapp:${to}`
//         });

//         res.status(200).json({ success: true, sid: message.sid });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });