const UUID4 = require('../uuid4');
const ContactEmailCollection = require('../contactEmailCollection');
const ContactEmail = require('../contactEmail');

const makeContactEmail = props => new ContactEmail({
  emailId: new UUID4().value,
  isStared: false,
  createdAt: 631152000,
  updatedAt: 631152000,
  archivedAt: null,
  ...props,
});

describe('ContactEmailCollection', () => {
  let collection = null;

  beforeEach(() => {
    collection = new ContactEmailCollection();
  });

  describe('its instance', () => {
    test('should be iterable', () => {
      expect(collection[Symbol.iterator]).toBeInstanceOf(Function);
    });
  });

  describe('addEmail()', () => {
    test('should add email to collection', () => {
      const email = makeContactEmail();
      collection.addEmail(email);

      const result = Array.from(collection);

      expect(result).toEqual([email]);
    });

    test('should not add same email twice', () => {
      const email = makeContactEmail()
      collection
        .addEmail(email)
        .addEmail(email)
        .addEmail(email);

      const result = Array.from(collection);

      expect(result).toEqual([email]);
    });
  });

  describe('removeEmail()', () => {
    test('should remove email from collection by id', () => {
      const email = makeContactEmail();
      collection
        .addEmail(email)
        .removeEmail({ emailId: email.emailId });

      const result = Array.from(collection);

      expect(result).toEqual([]);
    });

    test('remove twice should do nothing', () => {
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
      const email = makeContactEmail();

      const result = collection.findEmailById({ emailId: email.emailId });

      expect(result).toBeUndefined();
    });

    test('should return found email', () => {
      const email = makeContactEmail();
      collection.addEmail(email);

      const result = collection.findEmailById({ emailId: email.emailId });

      expect(result).toEqual(email);
    });
  });

  describe('size()', () => {
    test('new collection should return 0', () => {
      expect(collection.size()).toBe(0);

      const email = makeContactEmail();
      collection.addEmail(email);

      expect(collection.size()).toBe(1);
    });

    test('when adding item to collection should adjusted size', () => {
      const email = makeContactEmail();
      collection.addEmail(email);

      expect(collection.size()).toBe(1);
    });

    test('when removing item from collection should adjusted size', () => {
      const email = makeContactEmail();
      collection
        .addEmail(email)
        .removeEmail({ emailId: email.emailId });

      expect(collection.size()).toBe(0);
    });
  });
});
