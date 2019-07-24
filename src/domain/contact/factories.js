const UUID4 = require('../uuid4');
const AutogeneratedUUID4 = require('../autogeneratedUuid4');
const Contact = require('./contact');
const ContactEmailCollection = require('./contactEmailCollection');
const ContactEmailCollectionPolicy = require('./contactEmailCollectionPolicy');
const timeProvider = require('../../utils/timeProvider');

const makeStandardContact = ({
  id,
  ownerId,
  firstName,
  lastName,
  description,
  createdAt,
  updatedAt,
}) => {
  const standardPolicy = new ContactEmailCollectionPolicy(3);
  const _id = new UUID4(id);
  const _ownerId = new AutogeneratedUUID4(ownerId);
  const emails = new ContactEmailCollection(timeProvider, standardPolicy);
  const _createdAt = createdAt || timeProvider.now();
  const _updatedAt = updatedAt || timeProvider.now();

  return new Contact({
    id: _id.valie,
    ownerId: _ownerId.value,
    firstName,
    lastName,
    description,
    emails,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  },
  timeProvider);
};

const makePremiumContact = ({
  id,
  ownerId,
  firstName,
  lastName,
  description,
  createdAt,
  updatedAt,
}) => {
  const premiumPolicy = new ContactEmailCollectionPolicy(999);
  const _id = new UUID4(id);
  const _ownerId = new AutogeneratedUUID4(ownerId);
  const emails = new ContactEmailCollection(timeProvider, premiumPolicy);
  const _createdAt = createdAt || timeProvider.now();
  const _updatedAt = updatedAt || timeProvider.now();

  return new Contact({
    id: _id.valie,
    ownerId: _ownerId.value,
    firstName,
    lastName,
    description,
    emails,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  },
  timeProvider);
};

module.exports = {
  makeStandardContact,
  makePremiumContact,
};
