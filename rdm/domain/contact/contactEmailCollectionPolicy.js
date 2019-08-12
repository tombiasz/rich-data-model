class ContactEmailCollectionPolicy {
  constructor(maxAllowedContactEmails) {
    this.maxAllowedContactEmails = maxAllowedContactEmails;
  }

  check(iterator) {
    return iterator.size() < this.maxAllowedContactEmails;
  }

  get errorMessage() {
    return `only ${this.maxAllowedContactEmails} contact emails allowed`;
  }
}

module.exports = ContactEmailCollectionPolicy;
