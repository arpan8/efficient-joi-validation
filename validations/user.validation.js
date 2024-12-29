const Joi = require('joi')

exports.registerSchemaValidation = Joi.object({
  first_name: Joi.string().required().label('First name'),
  last_name: Joi.string().required().label('Last name'),
  email: Joi.string().email().required().label('Email'),
  date_of_birth: Joi.date().greater(new Date("1940-01-01")).required().label('Date of birth'),
  age: Joi.number().required().min(0).max(100).label('Age'),
  phone_number: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required().label('Phone number'),
  password: Joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@]{3,30}$")).required().label('Password'),
  confirm_password: Joi.ref("password")
})