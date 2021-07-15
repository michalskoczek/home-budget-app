const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(1024).required(),
    _csrf: Joi.string(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(1024).required(),
    _csrf: Joi.string(),
  });

  return schema.validate(data);
};

const budgetValidation = (data) => {
  const schema = Joi.object({
    budget: Joi.number().greater(0).positive().required(),
    _csrf: Joi.string(),
  });

  return schema.validate(data);
};

const expenseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    expense: Joi.number().greater(0).positive().required(),
    _csrf: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.budgetValidation = budgetValidation;
module.exports.expenseValidation = expenseValidation;
