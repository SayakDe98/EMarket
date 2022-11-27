const Joi = require('joi');
const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema(
  {
    cartId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Cart'
    },
    productId:{
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Product'
    },
    quantity:{
      type:Number,
      required:true
    },
    userId:{
      type:mongoose.Types.ObjectId,
      required:true
    }
  }
)
const CartItem = mongoose.model('CartItem', cartItemSchema);

function validateCartItem(cartItem) {
  const schema = Joi.object().keys({
    cartId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity:Joi.number().required(),
    userId:Joi.string().required()
 });

  return schema.validate(cartItem);
}

exports.CartItem = CartItem; 
exports.cartItemSchema = cartItemSchema;
exports.validate = validateCartItem;