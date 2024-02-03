const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST">' +
        '<input type="text" name="title" placeholder="Product Title">' +
        '<input type="text" name="size" placeholder="Product Size">' +
        '<button type="submit">Add Product</button></form>');
});

router.post('/add-product', (req, res, next) => {
    console.log('Product Title:', req.body.title);
    console.log('Product Size:', req.body.size);
    res.redirect('/');
});

module.exports = router;