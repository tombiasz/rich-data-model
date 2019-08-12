const User = require('../user');

const validUserProps = {
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  username: 'foo',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe('user domain model', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const user = new User(validUserProps);
      expect(user.id).toBe(validUserProps.id);
      expect(user.username).toBe(validUserProps.username);
      expect(user.createdAt).toBe(validUserProps.createdAt);
      expect(user.updatedAt).toBe(validUserProps.updatedAt);
    });
  });
});
