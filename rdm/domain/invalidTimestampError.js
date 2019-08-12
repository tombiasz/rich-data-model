const DomainError = require('./domainError');

class InvalidTimestampError extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'InvalidTimestamp';
  }
}

module.exports = InvalidTimestampError;
