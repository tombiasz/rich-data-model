class RemoveContactEmailToContactService {
  constructor(timeProvider) {
    this.timeProvider = timeProvider;
  }

  execute(contact, contactEmail) {
    const exists = this._findEmailByEmailId(contact, contactEmail.emailId);
    if (!exists) {
      return contact;
    }

    contact.emails = contact.emails.filter(e => e.emailId !== contactEmail.emailId);
    contact.updatedAt = this.timeProvider.now();
    return contact;
  }

  _findEmailByEmailId(contact, emailId) {
    return contact.emails.find(e => e.emailId === emailId);
  }
}

module.exports = RemoveContactEmailToContactService;
