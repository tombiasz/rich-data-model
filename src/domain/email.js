const EmailAddress = require('./emailAddress');

class Email {
  constructor({
    email,
    createdAt = Date.now(),
  }) {
    this.email = new EmailAddress(email).value;
    this.createdAt = createdAt;
  }
}

module.exports = Email;
