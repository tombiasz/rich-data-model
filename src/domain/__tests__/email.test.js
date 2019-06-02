const Email = require('../email');

describe('Email domain model', () => {
  describe('when creating a new Email instance', () => {
    describe('email', () => {
      test('when not passed should throw error', () => {
        expect(() => new Email({}))
          .toThrow(new Error('undefined is not a valid email address'));
      });

      test('when is an invalid email address should throw error', () => {
        expect(() => new Email({ email: 'foo@bar' }))
          .toThrow(new Error('foo@bar is not a valid email address'));
      });

      test('when is a valid email address should set value', () => {
        const value = 'foo@bar.com';
        const email = new Email({ email: value });

        expect(email.email).toBe(value);
      });
    });

    describe('createdAt', () => {
      test('should have default value set to now', () => {
        const email = new Email({ email: 'foo@bar.com' });

        expect(email.createdAt).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
