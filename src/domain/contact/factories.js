const UUID4 = require('../uuid4');
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
  const _ownerId = new UUID4(ownerId, { generateIfNull: false });
  const emails = new ContactEmailCollection(timeProvider);

  return new Contact({
    id: _id.valie,
    ownerId: _ownerId.value,
    firstName,
    lastName,
    description,
    emails,
    createdAt,
    updatedAt,
  },
  timeProvider);
};

module.exports = {
  makeContact,
};
