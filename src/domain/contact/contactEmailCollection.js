const ContactEmail = require('./contactEmail');
const ContactEmailAlreadyExistsError = require('./contactEmailAlreadyExistsError');
const ContactEmailPolicyViolationError = require('./contactEmailPolicyViolationError');

class ContactEmailCollection {
  constructor(timeProvider, policy) {
    this.emails = [];
    this.timeProvider = timeProvider;
    this.policy = policy;
  }

  * [Symbol.iterator]() {
    yield* this.emails;
  }

  addEmail({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  }) {
    const exists = this.findEmailById({ emailId });
    if (exists) {
      throw new ContactEmailAlreadyExistsError();
    }

    const email = new ContactEmail({
      emailId,
      isStarred,
      createdAt,
      updatedAt,
    },
    this.timeProvider);

    if (!this.policy.check(this)) {
      throw new ContactEmailPolicyViolationError(this.policy.errorMessage);
    }

    if (email.isStarred) {
      this.resetStarredEmails();
    }

    this.emails.push(email);
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
