const uuid4 = require('uuid4');

class UUID4 {
  constructor(value = null) {
    this.value = this.try(value);
  }

  try(value) {
    if (value === null) {
      return this.generate();
    }

    if (this.isValid(value)) {
      return value;
    }

    throw new Error('Invalid uuid4');
  }

  isValid(value) {
    return uuid4.valid(value);
  }

  generate() {
    return uuid4();
  }
}

module.exports = UUID4;
