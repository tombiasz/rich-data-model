const DomainError = require('../domainError');

class InvalidEmailError extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'InvalidEmail';
  }
}

module.exports = InvalidEmailError;
