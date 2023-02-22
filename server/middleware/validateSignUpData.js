const Joi = require('joi');

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(32).required(),
  password: Joi.string().min(8).max(256).required(),
});

const validateSignUpData = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false,
    });
  }
  next();
};

module.exports = validateSignUpData;