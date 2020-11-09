const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    userType: Joi.string().required().valid('CUSTOMER', 'DRIVER'),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    pushToken: Joi.string().required(),
    deviceType: Joi.string().required().valid('IOS', 'ANDROID'),
    lang: Joi.string().required().valid('ar', 'en'),
  }),
};

const getUserNotifications = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUserNotifications,
};
