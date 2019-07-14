const EmailAddress = require('../emailAddress');
const InvalidEmailAddressError = require('../invalidEmailAddressError');

describe('EmailAddress value object', () => {
  describe('when creating new email address', () => {
    test('when value was not passed should throw error', () => {
      expect(() => new EmailAddress())
        .toThrow(new InvalidEmailAddressError('undefined is not a valid email address'));
    });

    test('when value is am invalid email address should throw error', () => {
      expect(() => new EmailAddress('foo@bar'))
        .toThrow(new InvalidEmailAddressError('foo@bar is not a valid email address'));
    });

    test('when value is a valid email address should set value', () => {
      const value = 'foo@bar.com';

      const email = new EmailAddress(value);

      expect(email.value).toBe(value);
    });
  });
});
