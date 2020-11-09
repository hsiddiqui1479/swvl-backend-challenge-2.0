const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    title: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
    },
    body: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.pre('save', async function (next) {
  const notification = this;
  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
