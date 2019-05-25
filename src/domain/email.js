const validator = require('validator');

class Email {
  constructor({
    id,
    email,
    createdAt = Date.now(),
  }) {
    this.id = id;
    this.email = this.tryEmail(email);
    this.createdAt = createdAt;
  }

  // eslint-disable-next-line class-methods-use-this
  tryEmail(email) {
    if (!validator.isEmail(email)) {
      throw new Error(`${email} is not a valid email`);
    }
    return email;
  }
}

module.exports = Email;
