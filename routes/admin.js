const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST">' +
        '<input type="text" name="message" placeholder="Type your message">' +
        '<button type="submit">Send Message</button></form>');
});

router.post('/add-product', (req, res, next) => {
    const username = req.cookies.username;
    const message = req.body.message;

    const data = `${username}: ${message}\n`;

    fs.appendFile('messages.txt', data, (err) => {
        if (err) throw err;
        console.log('Message saved:', data);
        res.redirect('/');
    });
});

module.exports = router;
