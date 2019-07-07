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
}) => new Contact({
  id: new UUID4(id).value,
  ownerId: new UUID4(ownerId, { generateIfNull: false }).value,
  firstName,
  lastName,
  description,
  email: new ContactEmailCollection(timeProvider),
  createdAt,
  updatedAt,
}, timeProvider);

module.exports = {
  makeContact,
};
