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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.emails = emails;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = Contact;
