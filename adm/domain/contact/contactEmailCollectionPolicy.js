const ContactEmailPolicyViolationError = require('./contactEmailPolicyViolationError');

class ContactEmailCollectionPolicy {
  constructor(maxAllowedContactEmails) {
    this.maxAllowedContactEmails = maxAllowedContactEmails;
  }

  check(iterator) {
    if (iterator.size() < this.maxAllowedContactEmails) {
      return true;
    }

    throw new ContactEmailPolicyViolationError(this.errorMessage);
  }

  get errorMessage() {
    return `only ${this.maxAllowedContactEmails} contact emails allowed`;
  }
}

module.exports = ContactEmailCollectionPolicy;
