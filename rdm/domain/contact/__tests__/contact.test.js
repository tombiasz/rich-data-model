const { makeContact, makeContactEmail, NOW } = require('./testData');

describe('Contact entity', () => {
  describe('new instance', () => {
    test('should set initial attributes', () => {
      const contact = makeContact({
        id: '01c022c9-e6a3-4f7b-b02e-387b338b0366',
        ownerId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
        firstName: 'foo',
        lastName: 'bar',
        description: 'fizz buzz',
        createdAt: 631152000,
        updatedAt: 631152000,
      });
      expect(contact.id).toBe('01c022c9-e6a3-4f7b-b02e-387b338b0366');
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
      const contact = makeContact({
        firstName: 'foo',
        lastName: 'bar',
      });
      expect(contact.fullName).toBe('foo bar');
    });
  });

  describe('addEmail', () => {
    test('should delegate add email to emails collection', () => {
      const contact = makeContact();
      const {
        emailId, isStarred, createdAt, updatedAt,
      } = makeContactEmail();
      const data = {
        emailId, isStarred, createdAt, updatedAt,
      };
      contact.addEmail(data);
      expect(contact.emails.addEmail).toHaveBeenCalledWith(data);
    });

    test('should set updatedAt to now', () => {
      const contact = makeContact();
      const contactEmail = makeContactEmail();
      contact.addEmail(contactEmail);
      expect(contact.updatedAt).toBe(NOW);
    });
  });

  describe('removeEmail', () => {
    test('should remove email from emails list', () => {
      const contact = makeContact();
      const { emailId } = makeContactEmail();
      contact.removeEmail({ emailId });
      expect(contact.emails.removeEmail)
        .toHaveBeenCalledWith({ emailId });
    });

    test('should set updatedAt to now', () => {
      const contact = makeContact();
      const contactEmail = makeContactEmail();
      contact.addEmail(contactEmail);
      contact.removeEmail(contactEmail.emailId);
      expect(contact.updatedAt).toBe(NOW);
    });
  });

  describe('touch()', () => {
    test('should set updatedAt to now', () => {
      const contact = makeContact();
      contact.touch();
      expect(contact.updatedAt).toBe(NOW);
    });
  });
});
