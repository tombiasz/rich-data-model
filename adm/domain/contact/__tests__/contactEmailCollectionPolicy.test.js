const ContactEmailCollectionPolicy = require('../contactEmailCollectionPolicy');
const ContactEmailPolicyViolationError = require('../contactEmailPolicyViolationError');

describe('ContactEmailCollectionPolicy', () => {
  describe('check', () => {
    test('when size of the collection is more or equal then limit should throw error', () => {
      const policy = new ContactEmailCollectionPolicy(3);
      const collection = { size: () => 3 };

      expect(() => policy.check(collection))
        .toThrow(new ContactEmailPolicyViolationError('only 3 contact emails allowed'));
    });

    test('when size of the collection is less then limit should return true', () => {
      const policy = new ContactEmailCollectionPolicy(3);
      const collection = { size: () => 1 };
      const result = policy.check(collection);

      expect(result).toBe(true);
    });
  });
});
