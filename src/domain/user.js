const UUID5 = require('./uuid4');

class User {
  constructor({
    id = null,
    username,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    deletedAt = null,
  }) {
    this.id = new UUID4(id).id;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  get isDeleted() {
    return this.deletedAt !== null;
  }
}

module.exports = User;
