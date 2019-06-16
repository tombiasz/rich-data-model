const Contact = require('../contact');

const validContactProps = {
  id: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  ownerId: '16357d7a-5738-4d8b-adc7-b8fa10cd5331',
  firstName: 'foo',
  lastName: 'bar',
  description: 'fizz buzz',
  createdAt: 631152000,
  updatedAt: 631152000,
}

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

    describe('createdAt', () => {
      test('should have default value set to now', () => {
        const { createdAt, ...props } = validContactProps;
        const contact = new Contact(props);
        expect(contact.createdAt).toBeLessThanOrEqual(Date.now());
      });
    });

    describe('updatedAt', () => {
      test('should have default value set to now', () => {
        const { updatedAr, ...props } = validContactProps;
        const contact = new Contact(props);
        expect(contact.updatedAt).toBeLessThanOrEqual(Date.now());
      });
    });
    
    describe('archivedAt', () => {
      test('should have default value set to null', () => {
        const contact = new Contact(validContactProps);
        expect(contact.archivedAt).toBe(null);
      });
    });
  });

  describe('fullName', () => {
    test('should return first name and last name', () => {
      const contact = new Contact(validContactProps);
      expect(contact.fullName).toBe('foo bar');
    });
  });

  describe('isArchived()', () => {
    test('should return true if contact is archived', () => {
      const contact = new Contact({ 
        ...validContactProps,
        archivedAt: Date.now(),
      });
      expect(contact.isArchived()).toBe(true);
    });

    test('should return false if contact is not archived', () => {
      const contact = new Contact(validContactProps);
      expect(contact.isArchived()).toBe(false);
    });
  });

  describe('archive()', () => {
    test('should mark contact as archived', () => {
      const contact = new Contact(validContactProps);
      expect(contact.archivedAt).toBe(null);
      contact.archive();
      expect(contact.archivedAt).toBeLessThanOrEqual(Date.now());
    });

    test('should mark contact as updated', () => {
      const contact = new Contact(validContactProps);
      contact.archive();
      expect(contact.archivedAt).toBeLessThanOrEqual(Date.now());
    });
  });
});
