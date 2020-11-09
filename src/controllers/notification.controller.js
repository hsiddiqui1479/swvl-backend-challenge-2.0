const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');
const logger = require('../config/logger');

const createNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(httpStatus.CREATED).send(notification);
});

const dispatchNotification = catchAsync(async (req, res) => {
  const users = await notificationService.dispatchNotification(req.body);
  logger.info(`Notification successfully dispatched to [${users.length}] users.`);
  res.status(httpStatus.OK).send({
    success: 1,
    msg: 'Notifications successfully dispatched to these users',
    users: users
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.updateNotificationById(req.params.notificationId, req.body);
  res.send(notification);
});

const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteNotificationById(req.params.notificationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNotification,
  dispatchNotification,
  updateNotification,
  deleteNotification,
};
