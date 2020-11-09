const mongoose = require('mongoose');
const validator = require('validator');
const { deviceTypeEnums, userTypeEnums } = require('../config/config');

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum: userTypeEnums,
      default: 'CUSTOMER'
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    city: String,
    country: String,
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    pushToken: String,
    deviceType: {
      type: String,
      enum: deviceTypeEnums,
      default: 'ANDROID'
    },
    lang: {
      type: String,
      enum: ['en', 'ar'],
      default: 'en'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
