const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  price:{
    type:Number,
    required:true
  },
  color:
  {
    type:String,
    required:true,
    minlength:3,
    maxlength:50
  },
  numberInStock:
  {
    type:Number,
    required:true,
    min:0,
    max:50

  },
  // type:
  // {
  //   type:String,
  //   required:true,
  //   minlength:3,
  //   maxlength:50
  // },
  category:
  {
    type:String,
    required:true,
    // ref:'Category'
  },
  imageUrl:{
    type:String,
    required:true
  }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(50).required(),
    price:Joi.number().required(),
    color:Joi.string().min(3).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    // type: Joi.string().min(3).max(50).required()
    category: Joi.string().required(),
    imageUrl: Joi.string().required()
  });

  return schema.validate(product);
}

exports.productSchema = productSchema;
exports.Product = Product; 
exports.validate = validateProduct;