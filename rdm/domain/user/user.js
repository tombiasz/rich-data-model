class User {
  constructor({
    id,
    username,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
