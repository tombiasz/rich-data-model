const Email = require('../email');

const validEmailProps = {
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  email: 'foo@bar.com',
  createdAt: Date.now(),
};

describe('Email domain model', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const email = new Email(validEmailProps);
      expect(email.id).toBe(validEmailProps.id);
      expect(email.email).toBe(validEmailProps.email);
      expect(email.createdAt).toBe(validEmailProps.createdAt);
    });
  });
});
