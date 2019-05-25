const uuid4 = require('uuid4');

class UUID4 {
  constructor(id = null) {
    this.id = this.tryUUID4(id);
  }

  tryUUID4(value) {
    if (value === null) {
      return this.generateUUID4();
    }

    if (this.isValidUUID4(value)) {
      return value;
    }

    throw new Error('Invalid uuid4');
  }

  // eslint-disable-next-line class-methods-use-this
  isValidUUID4(value) {
    return uuid4.valid(value);
  }

  // eslint-disable-next-line class-methods-use-this
  generateUUID4() {
    return uuid4();
  }
}

module.exports = UUID4;
