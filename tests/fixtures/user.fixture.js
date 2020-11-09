const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../../src/models/user.model');
const Notification = require('../../src/models/notification.model');
const UserNotification = require('../../src/models/userNotification.model');

const userOne = {
  _id: mongoose.Types.ObjectId(),
  "email": faker.internet.email().toLowerCase(),
  "name": faker.name.findName(),
  "userType": "DRIVER",
  "city": faker.address.city(),
  "country": faker.address.country(),
  "phone": faker.phone.phoneNumber(),
  "pushToken": "abc123",
  "deviceType": "ANDROID",
  "lang": "ar"
}



const userTwo = {
  _id: mongoose.Types.ObjectId(),
  "email": faker.internet.email().toLowerCase(),
  "name": faker.name.findName(),
  "userType": "CUSTOMER",
  "city": faker.address.city(),
  "country": faker.address.country(),
  "phone": faker.phone.phoneNumber(),
  "pushToken": "abc123",
  "deviceType": "IOS",
  "lang": "en"
}

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user })));
};

const getUserNotificationSetup = async () => {
  const notiBody = {
    "title": {
      "en": "dummy title.",
      "ar": "لكن لا ب"
    },
    "body": {
      "en": "dummy body.",
      "ar": "لكن لا ب"
    }
  };
  const notification = await Notification.create(notiBody);

  const user = await User.create(userOne);

  const userNotibody = {
    notification: notification._id,
    userId: user._id,
    type: "SMS"
  };
  await UserNotification.create(userNotibody);

  return {
    notiBody,
    user
  }
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
  getUserNotificationSetup,
};
