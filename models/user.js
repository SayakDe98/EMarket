const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }

});

userSchema.methods.generateAuthToken = function()
{
  const token = jwt.sign({ _id:this._id},config.get('jwtPrivateKey'))
  return token
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User; 
exports.validate = validateUser;