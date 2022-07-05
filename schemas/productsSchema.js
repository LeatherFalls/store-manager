const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().required().min(5).message({
    message: '422|"name" length must be at least 5 characters long',
  }),
});

module.exports = productsSchema;