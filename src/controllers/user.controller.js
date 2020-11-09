const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsersByCriteria(req.query);
  res.send(result);
});

const getUserNotifications = catchAsync(async (req, res) => {
  const notifications = await userService.getUserNotifications(req.params.userId);
  res.status(httpStatus.OK).send(notifications);
});

module.exports = {
  createUser,
  getUsers,
  getUserNotifications,
};
