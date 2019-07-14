const uuid4 = require('uuid4');
const InvalidUUID4Error = require('./invalidUuid4Error');

class UUID4 {
  constructor(value) {
    this.value = this.try(value);
  }

  try(value) {
    if (this.isValid(value)) {
      return value;
    }

    throw new InvalidUUID4Error('Invalid uuid4');
  }

  isValid(value) {
    return uuid4.valid(value);
  }
}

module.exports = UUID4;
