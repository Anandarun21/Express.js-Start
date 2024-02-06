const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    res.cookie('username', username);
    res.redirect('/admin/enter-message'); // Redirect to admin/enter-message after login
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.cookies.username) {
        next(); // User is authenticated, continue to the next middleware
    } else {
        res.redirect('/login'); // Redirect to login page if not authenticated
    }
};

// Apply isAuthenticated middleware to routes that require authentication
app.use('/admin', isAuthenticated, adminRoutes);
app.use('/shop', isAuthenticated, shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not Found</h1>');
});

app.listen(5002);
