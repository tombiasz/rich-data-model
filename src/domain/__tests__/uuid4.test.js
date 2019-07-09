const UUID4 = require('../uuid4');

describe('UUID4 value object', () => {
  describe('when creating new UUID4', () => {
    test('when value was not provided should throw error', () => {
      expect(() => new UUID4().toThrow(new Error('Invalid uuid4')));
    });

    test('when value is null should throw error', () => {
      expect(() => new UUID4(null).toThrow(new Error('Invalid uuid4')));
    });

    test('when id is not a valid uuid4 should throw error', () => {
      expect(() => new UUID4(1234).toThrow(new Error('Invalid uuid4')));
    });

    test('when value is valid uuid4 should not throw error', () => {
      const value = '16357d7a-5738-4d8b-adc7-b8fa10cd5331';

      expect(() => new UUID4(value)).not.toThrow();
    });
  });
});
