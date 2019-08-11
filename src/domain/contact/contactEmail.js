class ContactEmail {
  constructor({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  }) {
    this.emailId = emailId;
    this.isStarred = isStarred;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get createdAt() {
    return this._createdAt.value;
  }

  get updatedAt() {
    return this._updatedAt.value;
  }

  star() {
    this.isStarred = true;
    this.touch();
    return this;
  }

  unstar() {
    this.isStarred = false;
    this.touch();
    return this;
  }

  touch() {
    this._updatedAt.touch();
    return this;
  }
}

module.exports = ContactEmail;
