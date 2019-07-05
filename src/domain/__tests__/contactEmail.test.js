const ContactEmail = require('../contactEmail');

const validProps = {
  emailId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  isStarred: false,
  createdAt: 631152000,
  updatedAt: 631152001,
};
const now = 123456;
const timeProvider = {
  now: () => now,
};

describe('ContactEmail', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const ca = new ContactEmail(validProps);
      expect(ca.emailId).toBe(validProps.emailId);
      expect(ca.isStarred).toBe(validProps.isStarred);
      expect(ca.createdAt).toBe(validProps.createdAt);
      expect(ca.updatedAt).toBe(validProps.updatedAt);
    });
  });

  describe('start()', () => {
    test('should set isStarred flag', () => {
      const ca = new ContactEmail({
        ...validProps,
        isStarred: false,
      }, timeProvider);
      ca.star();

      expect(ca.isStarred).toBe(true);
    });

    test('should set updatedAt to now', () => {
      const ca = new ContactEmail({
        ...validProps,
        isStarred: false,
      }, timeProvider);

      ca.star();

      expect(ca.updatedAt).toBe(now);
    });
  });

  describe('unstart()', () => {
    test('should unset isStarred flag', () => {
      const ca = new ContactEmail({
        ...validProps,
        isStarred: true,
      }, timeProvider);
      ca.unstar();

      expect(ca.isStarred).toBe(false);
    });

    test('should set udatedAt to now', () => {
      const ca = new ContactEmail({
        ...validProps,
        isStarred: true,
      }, timeProvider);

      ca.unstar();

      expect(ca.updatedAt).toBe(now);
    });
  });

  describe('touch()', () => {
    test('should set udatedAt to now', () => {
      const ca = new ContactEmail({
        ...validProps,
        isStarred: true,
      }, timeProvider);

      ca.touch();

      expect(ca.updatedAt).toBe(now);
    });
  });
});
