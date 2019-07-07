class Contact {
  constructor({
    id,
    ownerId,
    firstName,
    lastName,
    description,
    emails,
    createdAt,
    updatedAt,
  }, timeProvider) {
    this.id = id;
    this.ownerId = ownerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.emails = emails;
    this.timeProvider = timeProvider;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  addEmail({
    emailId,
    isStarred,
    createdAt,
    updatedAt,
  }) {
    this.emails.addEmail({
      emailId,
      isStarred,
      createdAt,
      updatedAt,
    });
    this.touch();
    return this;
  }

  removeEmail({ emailId }) {
    this.emails.removeEmail({ emailId });
    this.touch();
    return this;
  }

  touch() {
    this.updatedAt = this.timeProvider.now();
    return this;
  }
}

module.exports = Contact;
