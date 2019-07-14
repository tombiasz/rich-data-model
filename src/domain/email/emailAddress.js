const validator = require('validator');
const InvalidEmailAddressError = require('./invalidEmailAddressError');

class EmailAddress {
  constructor(value) {
    this.value = this.try(this.normalize(value));
  }

  try(value) {
    if (this.isValid(value)) {
      return value;
    }

    throw new InvalidEmailAddressError(`${value} is not a valid email address`);
  }

  normalize(value) {
    return String(value);
  }

  isValid(value) {
    return validator.isEmail(value);
  }
}

module.exports = EmailAddress;
