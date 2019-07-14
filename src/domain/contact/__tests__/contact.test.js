const Contact = require('../contact');
const ContactEmailCollection = require('../contactEmailCollection');

const now = 123456;
const timeProvider = {
  now: () => now,
};
const makeContact = () => new Contact({
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  ownerId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  firstName: 'foo',
  lastName: 'bar',
  description: 'fizz buzz',
  emails: new ContactEmailCollection(timeProvider),
  createdAt: 631152000,
  updatedAt: 631152000,
  archivedAt: null,
}, timeProvider);
const validContactEmailProps = {
  emailId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  isStarred: false,
  createdAt: 631152000,
  updatedAt: 631152001,
};

describe('Contact entity', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const contact = makeContact();
      expect(contact.id).toBe('16357d7a-5738-4d8b-adc7-b8fa10cd5331');
      expect(contact.ownerId).toBe('16357d7a-5738-4d8b-adc7-b8fa10cd5331');
      expect(contact.firstName).toBe('foo');
      expect(contact.lastName).toBe('bar');
      expect(contact.description).toBe('fizz buzz');
      expect(contact.createdAt).toBe(631152000);
      expect(contact.updatedAt).toBe(631152000);
    });
  });

  describe('fullName', () => {
    test('should return first name and last name', () => {
      const contact = makeContact();
      expect(contact.fullName).toBe('foo bar');
    });
  });

  describe('addEmail', () => {
    test('should add email to emails list', () => {
      const contact = makeContact();
      expect(contact.emails.size()).toBe(0);
      contact.addEmail(validContactEmailProps);
      expect(contact.emails.size()).toBe(1);
    });

    test('should set updatedAt to now', () => {
      const contact = makeContact();
      contact.addEmail(validContactEmailProps);
      expect(contact.updatedAt).toBe(now);
    });
  });

  describe('removeEmail', () => {
    test('should remove email from emails list', () => {
      const contact = makeContact();
      contact.addEmail(validContactEmailProps);
      expect(contact.emails.size()).toBe(1);
      contact.removeEmail({ emailId: validContactEmailProps.emailId });
      expect(contact.emails.size()).toBe(0);
    });

    test('should set updatedAt to now', () => {
      const contact = makeContact();
      contact.addEmail(validContactEmailProps);
      contact.removeEmail(validContactEmailProps.emailId);
      expect(contact.updatedAt).toBe(now);
    });
  });

  describe('touch()', () => {
    test('should set udatedAt to now', () => {
      const contact = makeContact();
      contact.touch();
      expect(contact.updatedAt).toBe(now);
    });
  });
});
