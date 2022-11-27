const jwt = require('jsonwebtoken')
const config = require('config')
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

module.exports = function ( req , res , next )
{
    // const token = req.header('x-auth-token')
    const token = req.header('Authorization');
    // const token = req.cookies.token;

    
    if(!token) return res.status(401).send("Access denied. No token provided.")

    try{

        const decoded = jwt.verify(token , config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    }
    catch(ex)
    {
        res.status(400).send("Invalid Token.")
    }
}