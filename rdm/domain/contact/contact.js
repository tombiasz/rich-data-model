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
  }) {
    this.id = id;
    this.ownerId = ownerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this.emails = emails;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get createdAt() {
    return this._createdAt.value;
  }

  get updatedAt() {
    return this._updatedAt.value;
  }

  addEmail(contactEmail) {
    this.emails.addEmail(contactEmail);
    this.touch();
    return this;
  }

  removeEmail({ emailId }) {
    this.emails.removeEmail({ emailId });
    this.touch();
    return this;
  }

  touch() {
    this._updatedAt.touch();
    return this;
  }
}

module.exports = Contact;
