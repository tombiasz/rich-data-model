const ContactEmailCollection = require('./contactEmailCollection');
const UUID4 = require('../uuid4');

class Contact {
  constructor({
    id,
    ownerId,
    firstName,
    lastName,
    description,
    createdAt,
    updatedAt,
  }, timeProvider) {
    this.id = new UUID4(id).value;
    this.ownerId = new UUID4(ownerId, { generateIfNull: false }).value;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.emails = new ContactEmailCollection(timeProvider);
    this.timeProvider = timeProvider;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  addEmail({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  }) {
    this.emails.addEmail({
      emailId,
      isStarred,
      createdAt,
      updatedAt,
    });
    this.touch();
    return this;
  }

  removeEmail({ emailId }) {
    this.emails.removeEmail({ emailId });
    this.touch();
    return this;
  }

  touch() {
    this.updatedAt = this.timeProvider.now();
    return this;
  }
}

module.exports = Contact;
