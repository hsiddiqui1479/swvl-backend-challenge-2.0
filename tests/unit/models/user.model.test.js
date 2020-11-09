const faker = require('faker');
const { User } = require('../../../src/models');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
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
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

});
