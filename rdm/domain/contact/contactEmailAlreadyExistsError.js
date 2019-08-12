const DomainError = require('../domainError');

class ContactEmailAlreadyExistsError extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'ContactEmailAlreadyExists';
  }
}

module.exports = ContactEmailAlreadyExistsError;
