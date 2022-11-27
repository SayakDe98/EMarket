const Joi = require('joi');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId ,
    required:true,
    ref:'User'
  }
})
const Cart = mongoose.model('Cart', cartSchema);

function validateCart(cart) {
  const schema = Joi.object().keys({
     userId: Joi.string().required()
  });

  return schema.validate(cart);
}

exports.Cart = Cart; 
exports.cartSchema = cartSchema;
exports.validate = validateCart;