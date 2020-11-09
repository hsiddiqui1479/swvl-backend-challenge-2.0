const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Notification } = require('../models');

const notificationExists = () => async (req, res, next) => {
  const notification = await Notification.findById(req.body.notificationId);
  if (!notification) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Notification ID does not exists'));
  }
  return next();
};

module.exports = notificationExists
