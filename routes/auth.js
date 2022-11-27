const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
   if(req.body.email==='' && req.body.password === ''){
    return res.status(400).send("Email and password cannot be empty")
   }
     else if(req.body.email===''){
      return res.status(400).send('Email cannot be empty')
    }
    else if(req.body.password===''){
      return res.status(400).send('Password cannot be empty')
    }
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Invalid email.")
    
    const validPassword = await bcrypt.compare(req.body.password , user.password)

    if(!validPassword) return res.status(400).send("Invalid password.")

    const token = user.generateAuthToken()
    
    // res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
    res.header('x-auth-token',token).send({..._.pick(user,['_id','name','email']), token })
    // res.send('x-auth-token',token);
    // localStorage.setItem('x-auth-token',token);
    // res.send(token)
 });

 function validate(req) {
    const schema = Joi.object().keys({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    });
  
    return schema.validate(req);
  }
  
  module.exports = router