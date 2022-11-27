const Joi = require('joi');
const mongoose = require('mongoose');

userAddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required:true,
    minlength:3,
    maxlength:50
  },

  addressLine1: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  addressLine2: {
    type: String,
    minlength: 0,
    maxlength: 255
  },
  state:{
    type:String,
    required:true,
    minlength:3,
    maxlength:50
  },
  pincode:{
    type:Number,
    required:true,
    min:100000,
    max:999999
  }
});
const UserAddress = mongoose.model('UserAddress', userAddressSchema);

function validateUserAddress(userAddress) {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    city: Joi.string().min(3).max(50).required(),
    addressLine1: Joi.string().min(10).max(255).required(),
    addressLine2: Joi.string().min(0).max(255).required(),
    state:Joi.string().min(3).max(50).required(),
    pincode:Joi.number().min(100000).max(999999).required()
  });

  return schema.validate(userAddress);
}

exports.UserAddressSchema = this.userAddressSchema;
exports.UserAddress = UserAddress; 
exports.validate = validateUserAddress;