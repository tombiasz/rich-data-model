class ContactEmail {
  constructor({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  },
  timeProvider) {
    this.emailId = emailId;
    this.isStarred = isStarred;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.timeProvider = timeProvider;
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
    this.updatedAt = this.timeProvider.now();
    return this;
  }
}

module.exports = ContactEmail;
