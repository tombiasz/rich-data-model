const InvalidTimestampError = require('./invalidTimestampError');

class Timestamp {
  constructor(value, timeProvider) {
    this.value = this.try(value);
    this.timeProvider = timeProvider;
  }

  try(value) {
    if (this.isValid(value)) {
      return value;
    }

    throw new InvalidTimestampError('Invalid timestamp');
  }

  isValid(value) {
    return (new Date(value)).getTime() > 0;
  }

  touch() {
    this.value = this.timeProvider.now();
  }
}

module.exports = Timestamp;
