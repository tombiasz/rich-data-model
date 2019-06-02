const UUID4 = require('./uuid4');

class User {
  constructor({
    id = null,
    username,
    createdAt = Date.now(),
    updatedAt = Date.now(),
  }) {
    this.id = new UUID4(id).value;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
