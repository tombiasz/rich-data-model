class ContactEmail {
  constructor({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  }) {
    this.emailId = emailId;
    this.isStarred = isStarred;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = ContactEmail;
