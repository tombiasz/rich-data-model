const chance = require('chance').Chance();
const Contact = require('../contact');
const ContactEmail = require('../contactEmail');

const NOW = 123456;
const timeProvider = {
  now: () => NOW,
};

const makeTimestamp = value => value || chance.timestamp();

const makeContact = (props = {}) => new Contact({
  id: chance.guid({ version: 4 }),
  ownerId: chance.guid({ version: 4 }),
  firstName: chance.first(),
  lastName: chance.last(),
  description: chance.paragraph(),
  emails: [],
  ...props,
  createdAt: makeTimestamp(props.createdAt),
  updatedAt: makeTimestamp(props.updatedAt),
});

const makeContactEmail = (props = {}) => new ContactEmail({
  emailId: chance.guid({ version: 4 }),
  isStarred: false,
  ...props,
  createdAt: makeTimestamp(props.createdAt),
  updatedAt: makeTimestamp(props.updatedAt),
});

const makePolicy = ({
  check = () => true,
} = {}) => ({
  check,
});

module.exports = {
  NOW,
  timeProvider,
  makeContact,
  makeContactEmail,
  makePolicy,
};
