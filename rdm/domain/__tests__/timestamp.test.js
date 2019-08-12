const Timestamp = require('../timestamp');
const InvalidTimestampError = require('../invalidTimestampError');

describe('Timestamp value object', () => {
  describe('when creating new Timestamp', () => {
    test('when value was not provided should throw error', () => {
      expect(() => new Timestamp().toThrow(new InvalidTimestampError('Invalid timestamp')));
    });

    test('when value is null should throw error', () => {
      expect(() => new Timestamp(null).toThrow(new InvalidTimestampError('Invalid timestamp')));
    });

    test('when value is not a valid timestamp', () => {
      expect(() => new Timestamp(null).toThrow(new InvalidTimestampError('Invalid timestamp')));
    });

    test('when value is valid timestamp should not throw error', () => {
      const value = 631152001;

      expect(() => new Timestamp(value)).not.toThrow();
    });
  });

  describe('touch', () => {
    test('should update value when invoked', () => {
      const expected = 12345678;
      const timeProviderMock = {
        now: () => expected,
      };
      const timestamp = new Timestamp(1234, timeProviderMock);
      expect(timestamp.value).toBe(1234);

      timestamp.touch();
      expect(timestamp.value).toBe(expected);
    });
  });
});
