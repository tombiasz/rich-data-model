const validator = require('validator');

class EmailAddress {
  constructor(value) {
    this.value = this.try(this.normalize(value));
  }

  try(value) {
    if (this.isValid(value)) {
      return value;
    }

    throw new Error(`${value} is not a valid email address`);
  }

  // eslint-disable-next-line class-methods-use-this
  normalize(value) {
    return String(value);
  }

  // eslint-disable-next-line class-methods-use-this
  isValid(value) {
    return validator.isEmail(value);
  }
}

module.exports = EmailAddress;
