const express = require('express')
const error = require('../middleware/error')
const auth = require('../routes/auth')
const users = require('../routes/users');
const register = require('../routes/register')
const products = require('../routes/products')
const carts = require('../routes/carts')
const cartItems = require('../routes/cartItems')
const orders = require('../routes/orders')
const orderItems = require('../routes/orderItems')
const userAddresses = require('../routes/userAddresses');
const checkout = require('../routes/checkout')
const buynow = require('../routes/buynow')
const orderhistory = require('../routes/orderhistory')
const categories = require('../routes/categories');
const cors = require('cors');
const cookieParser = require('cookie-parser');


module.exports = function(app)
{
    app.use(cors({origin:'*'}));
    app.use(cookieParser());
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/signup', register);
    app.use('/api/login', auth);
    app.use('/api/products', products);
    app.use('/api/categories', categories);
    app.use('/api/carts', carts);
    app.use('/api/cartItems', cartItems);
    app.use('/api/orders', orders);
    app.use('/api/orderItems', orderItems);
    app.use('/api/userAddresses', userAddresses);
    app.use('/api/checkout', checkout);
    app.use('/api/buynow', buynow);
    app.use('/api/orderhistory', orderhistory);
    app.use(error)

}