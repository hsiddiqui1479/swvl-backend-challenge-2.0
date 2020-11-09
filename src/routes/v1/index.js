const express = require('express');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const notificationRoute = require('./notification.route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/notifications', notificationRoute);

module.exports = router;
