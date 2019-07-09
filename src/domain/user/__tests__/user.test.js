const User = require('../user');

describe('User domain model', () => {
  describe('when creating a new User instance', () => {
    describe('id', () => {
      test('when not passed should generate uuid4', () => {
        const user = new User({});

        expect(user.id).not.toBeUndefined();
      });

      test('when is not a valid uuid4 should throw error', () => {
        expect(() => new User({ id: 1234 }))
          .toThrow(Error);
      });

      test('when is valid uuid4 should not throw error', () => {
        const uuid = '16357d7a-5738-4d8b-adc7-b8fa10cd5331';
        const user = new User({ id: uuid });

        expect(user.id).toBe(uuid);
      });
    });

    describe('createdAt', () => {
      test('should have default value set to now', () => {
        const user = new User({});

        expect(user.createdAt).toBeLessThanOrEqual(Date.now());
      });
    });

    describe('updatedAt', () => {
      test('should have default value set to now', () => {
        const user = new User({});

        expect(user.updatedAt).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
