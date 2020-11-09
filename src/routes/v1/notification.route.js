const express = require('express');
const validate = require('../../middlewares/validate');
const notification = require('../../middlewares/notification');
const notificationValidation = require('../../validations/notification.validation');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(notificationValidation.createNotification), notificationController.createNotification);

router
  .route('/dispatch')
  .post(validate(notificationValidation.dispatchNotification), notification(), notificationController.dispatchNotification);

router
  .route('/:notificationId')
  .patch(validate(notificationValidation.updateNotification), notificationController.updateNotification)
  .delete(validate(notificationValidation.deleteNotification), notificationController.deleteNotification);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Post and dispatch notifications to users.
 */

/**
 * @swagger
 * path:
 *  /notifications:
 *    post:
 *      summary: Create a notification
 *      description: Create new notification.
 *      tags: [Notifications]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - body
 *              properties:
 *                title:
 *                  type: object
 *                  properties:
 *                    ar: string
 *                    en: string
 *              example:
 *                  title:
 *                    en: dummy title
 *                    ar: ن كل هذه الأفكار
 *                  body:
 *                    en: dummy body
 *                    ar: ن كل هذه الأفكار
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Notification'
 */


/**
* @swagger
* path:
*  /notifications/dispatch:
*    post:
*      summary: Dispatch Push or SMS notifications to end users
*      description: This endpoint dispatched selected notification (SMS, PUSH or BOTH) to users.
*      tags: [Notifications]
*      security:
*        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              required:
*                - notificationId
*                - filterCriteria
*                - type
*              properties:
*                notificationId: string
*                filterCriteria: object
*                type: string
*              example:
*                notificationId: abc123
*                filterCriteria: {}
*                type: SMS
*      responses:
*        "200":
*          description: OK
*        "400":
*          description: Validation failed
*/


/**
 * @swagger
 * path:
 *  /notifications/{id}:
 *    delete:
 *      summary: Delete a Notification
 *      description: Delete a Notification.
 *      tags: [Notifications]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Notification id
 *      responses:
 *        "200":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Updated a notification
 *      description: Updated new notification.
 *      tags: [Notifications]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - body
 *              properties:
 *                title:
 *                  type: object
 *                  properties:
 *                    ar: string
 *                    en: string
 *              example:
 *                  title:
 *                    en: dummy title
 *                    ar: ن كل هذه الأفكار
 *                  body:
 *                    en: dummy body
 *                    ar: ن كل هذه الأفكار
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Notification'
 *
 */
