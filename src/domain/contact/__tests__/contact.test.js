const Contact = require('../contact');
const ContactEmailCollection = require('../contactEmailCollection');

const now = 123456;
const timeProvider = {
  now: () => now,
};
const validContactProps = {
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  ownerId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  firstName: 'foo',
  lastName: 'bar',
  description: 'fizz buzz',
  emails: new ContactEmailCollection(timeProvider),
  createdAt: 631152000,
  updatedAt: 631152000,
  archivedAt: null,
};
const validContactEmailProps = {
  emailId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  isStarred: false,
  createdAt: 631152000,
  updatedAt: 631152001,
};

describe('Contact entity', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const contact = new Contact(validContactProps);
      expect(contact.id).toBe(validContactProps.id);
      expect(contact.ownerId).toBe(validContactProps.ownerId);
      expect(contact.firstName).toBe(validContactProps.firstName);
      expect(contact.lastName).toBe(validContactProps.lastName);
      expect(contact.description).toBe(validContactProps.description);
      expect(contact.createdAt).toBe(validContactProps.createdAt);
      expect(contact.updatedAt).toBe(validContactProps.updatedAt);
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
