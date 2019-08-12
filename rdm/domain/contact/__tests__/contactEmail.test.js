const { makeContactEmail, NOW } = require('./testData');

describe('ContactEmail', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const ca = makeContactEmail({
        emailId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
        isStarred: false,
        createdAt: 631152000,
        updatedAt: 631152001,
      });
      expect(ca.emailId).toBe('16357d7a-5738-4d8b-adc7-b8fa10cd5331');
      expect(ca.isStarred).toBe(false);
      expect(ca.createdAt).toBe(631152000);
      expect(ca.updatedAt).toBe(631152001);
    });
  });

  describe('start()', () => {
    test('should set isStarred flag', () => {
      const ca = makeContactEmail({ isStarred: false });
      ca.star();
      expect(ca.isStarred).toBe(true);
    });

    test('should set updatedAt to now', () => {
      const ca = makeContactEmail({ isStarred: false });
      ca.star();
      expect(ca.updatedAt).toBe(NOW);
    });
  });

  describe('unstart()', () => {
    test('should unset isStarred flag', () => {
      const ca = makeContactEmail({ isStarred: true });
      ca.unstar();
      expect(ca.isStarred).toBe(false);
    });

    test('should set udatedAt to now', () => {
      const ca = makeContactEmail({ isStarred: true });
      ca.unstar();
      expect(ca.updatedAt).toBe(NOW);
    });
  });

  describe('touch()', () => {
    test('should set updatedAt to now', () => {
      const ca = makeContactEmail({ isStarred: true });
      ca.touch();
      expect(ca.updatedAt).toBe(NOW);
    });
  });
});
