const Joi = require('joi');
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: { 
      type: String,  
      required: true,
      ref:'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required:true
    },
    orderedTogetherId: {
      type: mongoose.Types.ObjectId,
      required: true
    }
  }
)
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

function validateOrderItem(orderItem) {
  const schema = Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    userId: Joi.string().required(),
    orderedTogetherId: Joi.string().required()
  })

  return schema.validate(orderItem);
}

exports.OrderItem = OrderItem; 
exports.orderItemSchema = orderItemSchema;
exports.validate = validateOrderItem;