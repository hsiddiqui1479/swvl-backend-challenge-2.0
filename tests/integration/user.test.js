const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../src/models');
const { userOne, userTwo, insertUsers, getUserNotificationSetup } = require('../fixtures/user.fixture');

setupTestDB();

describe('User routes', () => {
  describe('POST /v1/users', () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        "email": faker.internet.email().toLowerCase(),
        "name": faker.name.findName(),
        "userType": "CUSTOMER",
        "city": faker.address.city(),
        "country": faker.address.country(),
        "phone": faker.phone.phoneNumber(),
        "pushToken": "abc123",
        "deviceType": "IOS",
        "lang": "en"
      };
    });

    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        _id: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        __v: expect.anything(),
        "email": newUser.email,
        "name": newUser.name,
        "userType": newUser.userType,
        "city": newUser.city,
        "country": newUser.country,
        "phone": newUser.phone,
        "pushToken": newUser.pushToken,
        "deviceType": newUser.deviceType,
        "lang": newUser.lang
      });

      const dbUser = await User.findById(res.body._id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email });
    });

    test('should return 400 error if email is invalid', async () => {
      await insertUsers([userTwo]);
      newUser.email = 'invalidEmail';

      await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne, userTwo]);
      newUser.email = userOne.email;

      await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne, userTwo]);
      newUser.email = userOne.email;

      await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

  });

  describe('GET /v1/users/notifications/:userId', () => {
    test('should return user notification data in Arabic language', async () => {
      const result = await getUserNotificationSetup();
      const res = await request(app)
        .get(`/v1/users/notifications/${result.user._id}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body[0]).toMatchObject({ title: 'لكن لا ب', body: 'لكن لا ب' });
    });
  });

});
