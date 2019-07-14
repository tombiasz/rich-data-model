const DomainError = require('./domainError');

class InvalidUUID4Error extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'InvalidUUID4';
  }
}

module.exports = InvalidUUID4Error;
