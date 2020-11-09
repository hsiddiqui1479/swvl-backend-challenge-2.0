const Joi = require('joi');
const { objectId } = require('./custom.validation');

const dispatchNotification = {
  body: Joi.object()
    .keys({
      notificationId: Joi.required().custom(objectId),
      filterCriteria: Joi.object().required(),
      type: Joi.string().valid('PUSH', 'SMS', 'ALL').required(),
    }),
};

const createNotification = {
  body: Joi.object()
    .keys({
      title: Joi.object().required().keys({
        en: Joi.string().required(),
        ar: Joi.string().required(),
      }),
      body: Joi.object().required().keys({
        en: Joi.string().required(),
        ar: Joi.string().required(),
      }),
    }),
};

const updateNotification = {
  params: Joi.object().keys({
    notificationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.object().required().keys({
        en: Joi.string(),
        ar: Joi.string(),
      }),
      body: Joi.object().required().keys({
        en: Joi.string(),
        ar: Joi.string(),
      }),
    }),
};

const deleteNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  dispatchNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};
