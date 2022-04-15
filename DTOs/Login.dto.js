const Joi = require("joi");

const userLoginSchema = Joi.object({
  //  email: Joi.string().min(1).max(100).lowercase().trim().required(),
    email: Joi.string().email().min(1).max(100).lowercase().trim().required(),
    password: Joi.string()
        .min(1)
        .max(100)
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
        .required(),
   // password: Joi.string().min(1).max(100).required(),
});

module.exports = { userLoginSchema };
