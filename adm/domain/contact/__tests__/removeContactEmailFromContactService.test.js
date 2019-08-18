const RemoveContactEmailFromContactService = require('../removeContactEmailFromContactService');
const {
  makeContact,
  makeContactEmail,
  NOW,
  timeProvider,
} = require('./testData');

describe('RemoveContactEmailFromContactService', () => {
  describe('when email is being removed', () => {
    describe('when email is not on the list', () => {
      test('should return unchanged contact', () => {
        const service = new RemoveContactEmailFromContactService(timeProvider);
        const contact = makeContact();
        const contactEmail1 = makeContactEmail();
        const contactEmail2 = makeContactEmail();
        contact.emails = [contactEmail1];

        const result = service.execute(contact, contactEmail2);

        expect(result).toBe(contact);
        expect(result).toEqual(contact);
        expect(result.emails).toEqual([contactEmail1]);
      });
    });

    describe('when email is on the list', () => {
      test('should return contact with removed email', () => {
        const service = new RemoveContactEmailFromContactService(timeProvider);
        const contact = makeContact();
        const contactEmail1 = makeContactEmail();
        const contactEmail2 = makeContactEmail();
        contact.emails = [contactEmail1, contactEmail2];

        const result = service.execute(contact, contactEmail1);

        expect(result.emails).toEqual([contactEmail2]);
      });

      test('should updated contact updatedAt to now', () => {
        const service = new RemoveContactEmailFromContactService(timeProvider);
        const contact = makeContact();
        const contactEmail1 = makeContactEmail();
        const contactEmail2 = makeContactEmail();
        contact.emails = [contactEmail1, contactEmail2];

        const result = service.execute(contact, contactEmail1);

        expect(result.updatedAt).toEqual(NOW);
      });
    });
  });
});
