const ContactEmailAlreadyExistsError = require('./contactEmailAlreadyExistsError');
const ContactEmailPolicyViolationError = require('./contactEmailPolicyViolationError');

class ContactEmailCollection {
  constructor(policy) {
    this.emails = [];
    this.policy = policy;
  }

  * [Symbol.iterator]() {
    yield* this.emails;
  }

  addEmail(contactEmail) {
    const exists = this.findEmailById(contactEmail);
    if (exists) {
      throw new ContactEmailAlreadyExistsError();
    }

    if (!this.policy.check(this)) {
      throw new ContactEmailPolicyViolationError(this.policy.errorMessage);
    }

    if (contactEmail.isStarred) {
      this.resetStarredEmails();
    }

    this.emails.push(contactEmail);
    return this;
  }

  removeEmail({ emailId }) {
    this.emails = this.emails.filter(e => e.emailId !== emailId);
    return this;
  }

  resetStarredEmails() {
    this.emails.forEach(o => o.unstar());
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
