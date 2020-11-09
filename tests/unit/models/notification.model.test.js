const faker = require('faker');
const { Notification } = require('../../../src/models');

describe('Notification model', () => {
  describe('Notification validation', () => {
    let newNotification;
    beforeEach(() => {
      newNotification = {
        "title": {
          "en": "dummy",
          "ar": "ك أن كل هذه الأف"
        },
        "body": {
          "en": "dummy",
          "ar": "ك أن كل هذه الأف"
        }
      }
    });

    test('should correctly validate a valid Notification', async () => {
      await expect(new Notification(newNotification).validate()).resolves.toBeUndefined();
    });
  });

});
