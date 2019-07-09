const AutogenerateUUID4 = require('../autogenerateUuid4');

describe('AutogenerateUUID4 value object', () => {
  describe('when creating new UUID4', () => {
    test('when value was not provided should generate uuid4 by default', () => {
      const uuid = new AutogenerateUUID4();

      expect(uuid.value).not.toBeUndefined();
    });

    test('when value is null and generateIfNull flag is set should generate uuid4', () => {
      const uuid = new AutogenerateUUID4(null);

      expect(uuid.value).not.toBeUndefined();
    });
  });
});
