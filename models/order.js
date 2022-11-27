const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date
    },
    totalAmount: { 
      type: Number,  
      required: true,
      min:0
    },
    userAddressId:
    {
      type:String,
      required:true,
      ref:'UserAddress'
    },
    orderItemId:
    {
      type:String,
      required:true
    },
    bought:
    {
      type:Boolean,
      required:true
    },
    userId:{
      type:String,
      required:true,
      ref:'User'
    },
    productId:{
      type:String,
      required:true,
      ref:'Product'
    }
  }
)
const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object().keys({
    totalAmount: Joi.number().required(),
    userAddressId: Joi.string().required(),
    orderItemId: Joi.string().required(),
    orderDate:Joi.date().required(),
    bought:Joi.boolean().required(),
    userId:Joi.string().required(),
    productId:Joi.string().required()
  })

  return schema.validate(order);
}

exports.Order = Order; 
exports.orderSchema = orderSchema;
exports.validate = validateOrder;