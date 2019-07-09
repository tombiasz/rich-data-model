const Email = require('../email');

const validEmailProps = {
  email: 'foo@bar.com',
  createdAt: Date.now(),
};

describe('Email domain model', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const email = new Email(validEmailProps);
      expect(email.email).toBe(validEmailProps.email);
      expect(email.createdAt).toBe(validEmailProps.createdAt);
    });
  });
});
