class ContactEmail {
  constructor({
    emailId,
    isStarred = false,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    deletedAt = null,
  }) {
    this.emailId = emailId;
    this.isStarred = isStarred;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  get isDeleted() {
    return this.deletedAt !== null;
  }


  start() {
    this.start = true;
    this.touch();
    return this;
  }

  unstar() {
    this.star = false;
    this.touch();
    return this;
  }

  touch() {
    this.updatedAt = Date.now();
    return this;
  }

  markAsDeleted() {
    if (this.isDeleted) {
      return this;
    }

    this.deletedAt = Date.now();
    this.touch();
    return this;
  }
}

module.exports = ContactEmail;
