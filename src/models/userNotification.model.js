const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userNotificationSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notification: {
      type: Schema.Types.ObjectId,
      ref: 'Notification'
    },
    type: {
      type: String,
      enum: ['PUSH', 'SMS', 'ALL']
    }
  },
  {
    timestamps: true,
  }
);

const UserNotification = mongoose.model('UserNotification', userNotificationSchema);

module.exports = UserNotification;
