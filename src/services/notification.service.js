const logger = require('../config/logger');
const Queue = require('better-queue');
const config = require('../config/config');
const { userService } = require('../services');
const { sendPush } = require('../helpers/push');
const { sendSms } = require('../helpers/sms');


const {
  Notification,
  UserNotification
} = require('../models');

const notificationQueue = new Queue(
  async (batch, cb) => {
    batch.forEach(notification => {
      handleNotification(notification);
    });
    cb();
  },
  {
    batchSize: config.maxRequestLimit,
    afterProcessDelay: config.maxRequestTime,
  }
);

const createNotification = async (notificationBody) => {
  const notification = await Notification.create(notificationBody);
  return notification;
};

const getNotificationById = async (id) => {
  return Notification.findById(id);
};

const dispatchNotification = async (body) => {
  const users = await userService.queryUsersByCriteria(body.filterCriteria);
  const notification = await getNotificationById(body.notificationId);
  users.forEach(user => {
    const data = {
      user,
      notification,
      type: body.type
    };
    notificationQueue.push(data);
  });
  return users;
};



const handleNotification = async (data) => {
  const user = data.user;
  const notification = data.notification;
  const type = data.type;
  const body = {
    notification: notification._id,
    userId: user._id,
    type
  };

  await UserNotification.create(body);

  const payload = {
    title: notification.title[user.lang],
    body: notification.body[user.lang]
  };

  if (type === 'SMS') {
    sendSms(payload, user);
  } else if (type === 'PUSH') {
    sendPush(payload, user);
  } else {
    sendSms(payload, user);
    sendPush(payload, user);
  }
};

const updateNotificationById = async (notificationId, updateBody) => {
  const notification = await getNotificationById(notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  Object.assign(notification, updateBody);
  await notification.save();
  return notification;
};

const deleteNotificationById = async (notificationId) => {
  const notification = await getNotificationById(notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  await notification.remove();
  return notification;
};

module.exports = {
  dispatchNotification,
  getNotificationById,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
};
