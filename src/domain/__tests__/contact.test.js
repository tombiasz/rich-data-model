const Contact = require('../contact');

const validContactProps = {
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  ownerId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  firstName: 'foo',
  lastName: 'bar',
  description: 'fizz buzz',
  createdAt: 631152000,
  updatedAt: 631152000,
  archivedAt: null,
}
const validContactEmailProps = {
  emailId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  isStarred: false,
  createdAt: 631152000,
  updatedAt: 631152001,
};
const now = 123456;
const timeProvider = {
  now: () => now,
};

describe('Contact entity', () => {
  describe('when creating a new Contact instance', () => {
    describe('id', () => {
      test('when value was not provided should generate uuid4', () => {
        const { id, ...props } = validContactProps;
        const contact = new Contact(props);
        expect(contact.id).not.toBeUndefined();
      });

      test('when is not a valid uuid4 should throw error', () => {
        const { id, ...props } = validContactProps;
        expect(() => new Contact({ id: 1234, ...props }))
          .toThrow(Error);
      });

      test('when is valid uuid4 should not throw error', () => {
        const { id } = validContactProps;
        const contact = new Contact(validContactProps);
        expect(contact.id).toBe(id);
      });
    });

    describe('ownerid', () => {
      test('when value was not provided should throw error', () => {
        const { ownerId, ...props } = validContactProps;
        expect(() => new Contact(props)).toThrow(Error);
      });

      test('when is not a valid uuid4 should throw error', () => {
        const { ownerId, ...props } = validContactProps;
        expect(() => new Contact({ ownerId: 1234, ...props }))
          .toThrow(Error);
      });

      test('when is valid uuid4 should not throw error', () => {
        const { ownerId } = validContactProps;
        const contact = new Contact(validContactProps);
        expect(contact.id).toBe(ownerId);
      });
    });
  });

  describe('fullName', () => {
    test('should return first name and last name', () => {
      const contact = new Contact(validContactProps);
      expect(contact.fullName).toBe('foo bar');
    });
  });

  describe('addEmail', () => {
    test('should add email to emails list', () => {
      const contact = new Contact(validContactProps, timeProvider);
      expect(contact.emails.size()).toBe(0);
      contact.addEmail(validContactEmailProps);
      expect(contact.emails.size()).toBe(1);
    });

    test('should set updatedAt to now', () => {
      const contact = new Contact(validContactProps, timeProvider);
      contact.addEmail(validContactEmailProps);
      expect(contact.updatedAt).toBe(now);
    });
  });

  describe('removeEmail', () => {
    test('should remove email from emails list', () => {
      const contact = new Contact(validContactProps, timeProvider);
      contact.addEmail(validContactEmailProps);
      expect(contact.emails.size()).toBe(1);
      contact.removeEmail({ emailId: validContactEmailProps.emailId });
      expect(contact.emails.size()).toBe(0);
    });

    test('should set updatedAt to now', () => {
      const contact = new Contact(validContactProps, timeProvider);
      contact.addEmail(validContactEmailProps);
      contact.removeEmail(validContactEmailProps.emailId);
      expect(contact.updatedAt).toBe(now);
    });
  });

  describe('touch()', () => {
    test('should set udatedAt to now', () => {
      const contact = new Contact(validContactProps, timeProvider);
      contact.touch();
      expect(contact.updatedAt).toBe(now);
    });
  });
});
