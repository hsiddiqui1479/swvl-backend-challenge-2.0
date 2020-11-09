const logger = require('../config/logger');

const sendPush = async (_payload, user) => {
  logger.info(`Push notification successfully sent to [${user.email}]`);
};


module.exports = {
  sendPush
};
