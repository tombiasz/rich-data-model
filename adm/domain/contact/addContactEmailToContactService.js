const ContactEmailAlreadyExistsError = require('./contactEmailAlreadyExistsError');

class AddContactEmailToContactService {
  constructor(policy, timeProvider) {
    this.policy = policy;
    this.timeProvider = timeProvider;
  }

  execute(contact, contactEmail) {
    this.policy.check(contact.emails);
    this._checkEmailExists(contact, contactEmail);
    if (contactEmail.isStarred) {
      this._resetStaredEmails(contact);
    }
    this._addEmail(contact, contactEmail);
    return contact;
  }

  _checkEmailExists(contact, contactEmail) {
    const exists = this._findEmailByEmailId(contact, contactEmail.emailId);
    if (exists) {
      throw new ContactEmailAlreadyExistsError();
    }
  }

  _findEmailByEmailId(contact, emailId) {
    return contact.emails.find(e => e.emailId === emailId);
  }

  _resetStaredEmails(contact) {
    contact.emails.forEach(e => this._unstarContactEmail(e));
  }

  _unstarContactEmail(contactEmail) {
    contactEmail.isStarred = false;
    contactEmail.updatedAt = this.timeProvider.now();
  }

  _addEmail(contact, contactEmail) {
    contact.emails.push(contactEmail);
    contact.updatedAt = this.timeProvider.now();
  }
}

module.exports = AddContactEmailToContactService;
