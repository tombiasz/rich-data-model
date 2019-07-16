const ContactEmailCollectionPolicy = require('../contactEmailCollectionPolicy');

describe('ContactEmailCollectionPolicy', () => {
  describe('check', () => {
    test('when size of the collection is more or equal then limit should return false', () => {
      const policy = new ContactEmailCollectionPolicy(3);
      const collection = { size: () => 3 };
      const result = policy.check(collection);
      expect(result).toBe(false);
    });

    test('when size of the collection is less then limit should return true', () => {
      const policy = new ContactEmailCollectionPolicy(3);
      const collection = { size: () => 1 };
      const result = policy.check(collection);
      expect(result).toBe(true);
    });
  });
});
