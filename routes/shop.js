const express = require('express');
const router = express.Router();
const fs = require('fs');

const messagesFilePath = 'messages.txt';

router.get('/enter-message', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST">' +
        '<input type="text" name="message" placeholder="Type your message">' +
        '<button type="submit">Send Message</button></form>');
});

router.get('/', (req, res, next) => {
    // Check if the file exists
    fs.access(messagesFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, create it
            fs.writeFileSync(messagesFilePath, '');
            console.log('Created messages.txt');
            return res.send('<h1>Messages</h1><p>No messages yet.</p>');
        }

        // Read messages from the file
        fs.readFile(messagesFilePath, 'utf8', (err, data) => {
            if (err) throw err;

            const messages = data.split('\n').filter(Boolean);

            const formattedMessages = messages.map(message => `<p>${message}</p>`).join('');
            res.send(`<h1>Messages</h1>${formattedMessages}`);
        });
    });
});

module.exports = router;
