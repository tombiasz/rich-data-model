const ContactEmail = require('./contactEmail');

class ContactEmailCollection {
  constructor() {
    this.emails = [];
  }

  * [Symbol.iterator]() {
    yield* this.emails;
  }

  addEmail({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    const exists = this.findEmailById({ emailId });
    if (exists) {
      return this;
    }

    const email = new ContactEmail({
      emailId,
      isStarred,
      createdAt,
      updatedAt,
      deletedAt,
    });

    this.emails.push(email);
    return this;
  }

  removeEmail({ emailId }) {
    this.emails = this.emails.filter(e => e.emailId !== emailId);
    return this;
  }

  findEmailById({ emailId }) {
    return this.findEmail(e => e.emailId === emailId);
  }

  findEmail(predicate) {
    return this.emails.find(predicate);
  }

  size() {
    return this.emails.length;
  }
}

module.exports = ContactEmailCollection;
