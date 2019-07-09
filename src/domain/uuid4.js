const uuid4 = require('uuid4');

class UUID4 {
  constructor(value) {
    this.value = this.try(value);
  }

  try(value) {
    if (this.isValid(value)) {
      return value;
    }

    throw new Error('Invalid uuid4');
  }

  isValid(value) {
    return uuid4.valid(value);
  }
}

module.exports = UUID4;
