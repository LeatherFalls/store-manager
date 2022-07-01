const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().required().min(5).messages({
    'string.empty': '400|"name" is required',
    'string.min': '422|"name" length must be at least 5 characters long',
  }),
});

module.exports = productsSchema;