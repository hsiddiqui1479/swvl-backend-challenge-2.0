const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(userController.getUsers);

router
  .route('/notifications/:userId')
  .get(validate(userValidation.getUserNotifications), userController.getUserNotifications);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * path:
 *  /users:
 *    post:
 *      summary: Create a user
 *      description: Create new user.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - phone
 *                - userType
 *                - deviceType
 *                - lang
 *                - country
 *                - city
 *                - pushToken
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                phone:
 *                  type: string
 *                userType:
 *                   type: string
 *                   enum: [CUSTOMER, DRIVER]
 *                deviceType:
 *                   type: string
 *                   enum: [ANDROID, IOS]
 *                lang:
 *                   type: string
 *                   enum: [ar, en]
 *                country:
 *                  type: string
 *                city:
 *                  type: string
 *                pushToken:
 *                  type: string
 *              example:
 *                  email: dummy@126.com
 *                  name: hassan
 *                  userType: DRIVER
 *                  city: Islamabad
 *                  country: Pakistan
 *                  phone: "03435002034"
 *                  pushToken: abc123
 *                  deviceType: ANDROID
 *                  lang: ar
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *
 *    get:
 *      summary: Get all users
 *      description: Get all users.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 */

/**
 * @swagger
 * path:
 *  /users/notifications/{id}:
 *    get:
 *      summary: Get user's notifications
 *      description: Reterieves users notifications in user's Set language.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
