const DomainError = require('../domainError');

class ContactEmailPolicyViolationError extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'ContactEmailPolicyViolation';
  }
}

module.exports = ContactEmailPolicyViolationError;
