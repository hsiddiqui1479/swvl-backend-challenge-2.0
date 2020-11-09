const logger = require('../config/logger');

const sendSms = async (_payload, user) => {
  logger.info(`SMS notification successfully sent to [${user.phone}]`);
};

module.exports = {
  sendSms
};
