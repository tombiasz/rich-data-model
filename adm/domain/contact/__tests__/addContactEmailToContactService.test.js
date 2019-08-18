const AddContactEmailToContactService = require('../addContactEmailToContactService');
const ContactEmailAlreadyExistsError = require('../contactEmailAlreadyExistsError');
const {
  makeContact,
  makeContactEmail,
  NOW,
  makePolicy,
  timeProvider,
} = require('./testData');

describe('AddContactEmailToContactService', () => {
  describe('when new email is being added', () => {
    describe('and policy is violated', () => {
      test('should throw error', () => {
        const fakePolicy = makePolicy({ check: () => { throw new Error(); }, });
        const service = new AddContactEmailToContactService(fakePolicy);
        const contact = makeContact();

        expect(() => service.execute(contact)).toThrow(new Error())
      });
    });

    describe('and email already exists on the list', () => {
      test('should throw error', () => {
        const service = new AddContactEmailToContactService(makePolicy());
        const contactEmail = makeContactEmail();
        const contact = makeContact();
        contact.emails = [contactEmail];

        expect(() => service.execute(contact, contactEmail))
          .toThrow(new ContactEmailAlreadyExistsError());
      });
    });

    describe('and new email is starred', () => {
      test('should reset stared emails', () => {
        const service = new AddContactEmailToContactService(makePolicy(), timeProvider);
        const contactEmail1 = makeContactEmail({ isStarred: true });
        const contactEmail2 = makeContactEmail({ isStarred: true });
        const contact = makeContact();
        contact.emails = [contactEmail1];

        const result = service.execute(contact, contactEmail2);
        const expected = [
          makeContactEmail({ ...contactEmail1, isStarred: false }),
          makeContactEmail({ ...contactEmail2, isStarred: true }),
        ];

        expect(result.emails).toEqual(expected);
      });

      test('should update unstared email updatedAt to now', () => {
        const service = new AddContactEmailToContactService(makePolicy(), timeProvider);
        const contactEmail1 = makeContactEmail({ isStarred: true });
        const contactEmail2 = makeContactEmail({ isStarred: true });
        const contact = makeContact();
        contact.emails = [contactEmail1];

        const result = service.execute(contact, contactEmail2);
        const expected = makeContactEmail({
          ...contactEmail1,
          isStarred: false,
          updatedAt: NOW,
        });

        expect(result.emails[0]).toEqual(expected);
      });
    });

    describe('and new email is not starred', () => {
      test('should not reset stared emails', () => {
        const service = new AddContactEmailToContactService(makePolicy(), timeProvider);
        const contactEmail1 = makeContactEmail({ isStarred: true });
        const contactEmail2 = makeContactEmail({ isStarred: false });
        const contact = makeContact();
        contact.emails = [contactEmail1];

        const result = service.execute(contact, contactEmail2);
        const expected = [
          makeContactEmail({ ...contactEmail1, isStarred: true }),
          makeContactEmail({ ...contactEmail2, isStarred: false }),
        ];

        expect(result.emails).toEqual(expected);
      });
    });

    test('should add email to contact', () => {
      const service = new AddContactEmailToContactService(makePolicy(), timeProvider);
      const contactEmail = makeContactEmail({ isStarred: true });
      const contact = makeContact();

      const result = service.execute(contact, contactEmail);

      expect(result.emails).toEqual([contactEmail]);
    });

    test('should update contact updtedAt to now', () => {
      const service = new AddContactEmailToContactService(makePolicy(), timeProvider);
      const contactEmail = makeContactEmail({ isStarred: true });
      const contact = makeContact();

      const result = service.execute(contact, contactEmail);

      expect(result.updatedAt).toBe(NOW);
    });
  });
});
