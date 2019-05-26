const uuid4 = require('uuid4');
const User = require('../user');

describe('User domain model', () => {
  describe('when creating new user', () => {
    test('when id was not passed should generate uuid4', () => {
      const user = new User();

      expect(user.id).not.toBeUndefined();
      expect(uuid4.valid(user.id)).toBe(true);
    });

    test('when id is not a valid uuid4 should throw error', () => {
      expect(() => new User({ id: 1234 }))
        .toThrow(Error);
    });

    test('when id is valid uuid4 should not throw error', () => {
      const uuid = '16357d7a-5738-4d8b-adc7-b8fa10cd5331';
      const user = new User({ id: uuid });

      expect(user.id).toBe(uuid);
      expect(uuid4.valid(user.id)).toBe(true);
    });

    test('createdAt should have default value set to now', () => {
      const user = new User();

      expect(user.createdAt).toBeLessThanOrEqual(Date.now());
    });

    test('updatedAt should have default value set to now', () => {
      const user = new User();

      expect(user.updatedAt).toBeLessThanOrEqual(Date.now());
    });
  });
});
