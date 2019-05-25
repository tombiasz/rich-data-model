const ContactEmail = require('./contactEmail');

const EMAILS_PER_CONTACT_LIMIT = 3;

class Contact {
  constructor({
    id,
    firstName,
    lastName,
    description,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    deletedAt = null,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.emails = [];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isDeleted() {
    return this.deletedAt !== null;
  }

  addEmail(emailId, isStarred) {
    if (this.isEmailsLimitExceeded()) {
      throw new Error(`You can only have ${EMAILS_PER_CONTACT_LIMIT} emails in single contact`);
    }

    if (this.isEmailExists(emailId)) {
      return this;
    }

    const newEmail = new ContactEmail({ emailId, isStarred });

    if (newEmail.isStarred) {
      this.resetStarredEmails();
    }

    this.emails.push(newEmail);
    this.touch();

    return this;
  }

  removeEmail(emailId) {
    const emailToRemove = this.emails.find(o => o.emailId === emailId);
    emailToRemove.markAsDeleted();
    this.touch();
    return this;
  }

  resetStarredEmails() {
    this.emails.forEach(o => o.unstar());
    this.touch();
    return this;
  }

  isEmailsLimitExceeded() {
    return this.countEmails() < EMAILS_PER_CONTACT_LIMIT;
  }

  touch() {
    this.updatedAt = Date.now();
    return this;
  }

  markAsDeleted() {
    this.deletedAt = Date.now();
    this.emails.forEach(o => o.markAsDeleted());
    this.touch();
    return this;
  }

  isEmailExists(emailId) {
    return this.emails.some(o => !o.isDeleted && o.emailId === emailId);
  }

  countEmails() {
    return this.emails.filter(o => !o.isDeleted).length;
  }
}

module.exports = Contact;
