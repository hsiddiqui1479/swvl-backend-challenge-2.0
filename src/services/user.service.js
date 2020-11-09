const httpStatus = require('http-status');
const {
  User,
  UserNotification
} = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const queryUsersByCriteria = async (filter) => {
  return User.find(filter);
};

const getUserNotifications = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const notifications = await UserNotification.find({ userId }).populate('notification');

  const result = notifications.map(unit => ({
    title: unit.notification.title[user.lang],
    body: unit.notification.body[user.lang],
  }));
  return result;
};

module.exports = {
  createUser,
  queryUsersByCriteria,
  getUserNotifications,
};
