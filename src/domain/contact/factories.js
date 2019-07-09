const UUID4 = require('../uuid4');
const AutogenerateUUID4 = require('../autogenerateUuid4');
const Contact = require('./contact');
const ContactEmailCollection = require('./contactEmailCollection');
const timeProvider = require('../../utils/timeProvider');

const makeContact = ({
  id,
  ownerId,
  firstName,
  lastName,
  description,
  createdAt,
  updatedAt,
}) => {
  const _id = new UUID4(id);
  const _ownerId = new AutogenerateUUID4(ownerId);
  const emails = new ContactEmailCollection(timeProvider);
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
  makeContact,
};
