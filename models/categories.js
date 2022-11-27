const Joi = require('joi');
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }  
});

const Category = mongoose.model('Category', categoriesSchema);

function validateCategory(categories) {
  const schema = Joi.object().keys({
    category: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(categories);
}

exports.categoriesSchema = categoriesSchema;
exports.Category = Category; 
exports.validate = validateCategory;