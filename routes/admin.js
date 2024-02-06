const express = require('express');
const router = express.Router();
const fs = require('fs');

const messagesFilePath = 'messages.txt';

router.get('/enter-message', (req, res, next) => {
    res.send('<form action="/admin/add-message" method="POST">' +
        '<input type="text" name="message" placeholder="Type your message">' +
        '<button type="submit">Send Message</button></form>');
});

router.post('/add-message', (req, res, next) => {
    const username = req.cookies.username; // Retrieve username from cookie
    const message = req.body.message;
    
    fs.appendFileSync(messagesFilePath, `${username}: ${message}\n`);
    
    res.redirect('/admin'); // Redirect to the admin messages page after adding message
});

router.get('/', (req, res, next) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        const messages = data.split('\n').filter(Boolean);

        const formattedMessages = messages.map(message => {
            const [username, text] = message.split(': ');
            return `<p><strong>Username:</strong> ${username}</p><p><strong>Message:</strong> ${text}</p>`;
        }).join('');

        res.send(`<h1>Messages</h1>${formattedMessages}`);
    });
});

module.exports = router;
