const Joi = require('joi')

exports.module = function()
{
    Joi.objectId = require('joi-objectid')(Joi)
}