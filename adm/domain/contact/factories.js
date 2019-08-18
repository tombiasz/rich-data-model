const Contact = require('./contact');
const ContactEmail = require('./contactEmail');
const timeProvider = require('../../utils/timeProvider');
const ContactEmailCollectionPolicy = require('./contactEmailCollectionPolicy');
const AddContactEmailToContactService = require('./addContactEmailToContactService');
const RemoveContactEmailFromContactService = require('./removeContactEmailFromContactService');

const standardPolicy = new ContactEmailCollectionPolicy(3);
const premiumPolicy = new ContactEmailCollectionPolicy(999);

const makeContact = ({
  id,
  ownerId,
  firstName,
  lastName,
  description,
  createdAt,
  updatedAt,
}) => new Contact({
  id,
  ownerId,
  firstName,
  lastName,
  description,
  emails: [],
  createdAt: createdAt || timeProvider.now(),
  updatedAt: updatedAt || timeProvider.now(),
});

const makeContactEmail = ({
  emailId,
  isStarred,
  createdAt,
  updatedAt,
}) => new ContactEmail({
  emailId,
  isStarred,
  createdAt: createdAt || timeProvider.now(),
  updatedAt: updatedAt || timeProvider.now(),
});

const makeAddContactEmailToStandardContactService = () => new AddContactEmailToContactService(
  standardPolicy,
  timeProvider,
);

const makeAddContactEmailToPremiumContactService = () => new AddContactEmailToContactService(
  premiumPolicy,
  timeProvider,
);

const makeRemoveContactEmailFromContactService = () => new RemoveContactEmailFromContactService(
  timeProvider,
);

module.exports = {
  makeContact,
  makeContactEmail,
  makeAddContactEmailToStandardContactService,
  makeAddContactEmailToPremiumContactService,
  makeRemoveContactEmailFromContactService,
};
