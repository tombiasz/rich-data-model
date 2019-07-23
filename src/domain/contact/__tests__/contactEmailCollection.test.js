const { makeContactEmail, makeContactEmailCollection, makePolicy } = require('./testData');
const ContactEmailAlreadyExistsError = require('../contactEmailAlreadyExistsError');
const ContactEmailPolicyViolationError = require('../contactEmailPolicyViolationError');

describe('ContactEmailCollection', () => {
  describe('its instance', () => {
    test('should be iterable', () => {
      const collection = makeContactEmailCollection();
      expect(collection[Symbol.iterator]).toBeInstanceOf(Function);
    });
  });

  describe('addEmail()', () => {
    test('should add email to collection', () => {
      const collection = makeContactEmailCollection();
      expect(collection[Symbol.iterator]).toBeInstanceOf(Function);
      const email = makeContactEmail();
      collection.addEmail(email);

      const result = Array.from(collection);

      expect(result).toEqual([email]);
    });

    test('should throw error if email already exists', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();

      expect.assertions(1);

      try {
        collection
          .addEmail(email)
          .addEmail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(ContactEmailAlreadyExistsError);
      }
    });

    test('should throw error if email does not pass policy check', () => {
      const policy = makePolicy({ returnSuccess: false });
      const collection = makeContactEmailCollection({ aPolicy: policy });
      const email = makeContactEmail();

      expect.assertions(2);

      try {
        collection.addEmail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(ContactEmailPolicyViolationError);
        expect(err.message).toBe('policy error');
      }
    });

    test('should reset starred email if new email is starred', () => {
      const collection = makeContactEmailCollection();
      const spy = jest.spyOn(collection, 'resetStarredEmails');
      const email = makeContactEmail({ isStarred: true });

      collection.addEmail(email);

      expect(spy).toHaveBeenCalled();
    });

    test('should not reset starred email if new email is not starred', () => {
      const collection = makeContactEmailCollection();
      const spy = jest.spyOn(collection, 'resetStarredEmails');
      const email = makeContactEmail({ isStarred: false });

      collection.addEmail(email);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('removeEmail()', () => {
    test('should remove email from collection by id', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();
      collection
        .addEmail(email)
        .removeEmail({ emailId: email.emailId });

      const result = Array.from(collection);

      expect(result).toEqual([]);
    });

    test('remove twice should do nothing', () => {
      const collection = makeContactEmailCollection();
      const email1 = makeContactEmail();
      const email2 = makeContactEmail();
      collection
        .addEmail(email1)
        .addEmail(email2)
        .removeEmail({ emailId: email1.emailId })
        .removeEmail({ emailId: email1.emailId });

      const result = Array.from(collection);

      expect(result).toEqual([email2]);
    });
  });

  describe('findEmailById()', () => {
    test('should return undefined if email does not exist', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();

      const result = collection.findEmailById({ emailId: email.emailId });

      expect(result).toBeUndefined();
    });

    test('should return found email', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();
      collection.addEmail(email);

      const result = collection.findEmailById({ emailId: email.emailId });

      expect(result).toEqual(email);
    });
  });

  describe('size()', () => {
    test('new collection should return 0', () => {
      const collection = makeContactEmailCollection();
      expect(collection.size()).toBe(0);

      const email = makeContactEmail();
      collection.addEmail(email);

      expect(collection.size()).toBe(1);
    });

    test('when adding item to collection should adjusted size', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();
      collection.addEmail(email);

      expect(collection.size()).toBe(1);
    });

    test('when removing item from collection should adjusted size', () => {
      const collection = makeContactEmailCollection();
      const email = makeContactEmail();
      collection
        .addEmail(email)
        .removeEmail({ emailId: email.emailId });

      expect(collection.size()).toBe(0);
    });
  });

  describe('resetStarredEmails()', () => {
    test('should reset isStarred flag on all emails', () => {
      const collection = makeContactEmailCollection();
      collection
        .addEmail(makeContactEmail({ isStarred: false }))
        .addEmail(makeContactEmail({ isStarred: true }));

      collection.resetStarredEmails();

      const result = Array.from(collection);

      result.forEach(e => expect(e.isStarred).toBe(false));
    });
  });
});
