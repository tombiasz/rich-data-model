const EmialAddress = require('./emailAddress');

class Email {
  constructor({
    id,
    email,
    createdAt = Date.now(),
  }) {
    this.id = id;
    this.email = new EmialAddress(email).value;
    this.createdAt = createdAt;
  }
}

module.exports = Email;
