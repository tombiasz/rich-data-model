const chance = require('chance').Chance();
const Timestamp = require('../../timestamp');
const Contact = require('../contact');
const ContactEmail = require('../contactEmail');
const ContactEmailCollection = require('../contactEmailCollection');

const NOW = 123456;
const timeProvider = {
  now: () => NOW,
};

const collectionMock = {
  addEmail: jest.fn(),
  removeEmail: jest.fn(),
};

const makeTimestamp = value => new Timestamp(value || chance.timestamp(), timeProvider);

const makeContact = (props = {}) => new Contact({
  id: chance.guid({ version: 4 }),
  ownerId: chance.guid({ version: 4 }),
  firstName: chance.first(),
  lastName: chance.last(),
  description: chance.paragraph(),
  emails: collectionMock,
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
  returnSuccess = true,
  returnErrMsg = 'policy error',
} = {}) => ({
  check: jest.fn().mockReturnValue(returnSuccess),
  errorMessage: returnErrMsg,
});

const makeContactEmailCollection = ({
  aPolicy = makePolicy(),
} = {}) => new ContactEmailCollection(aPolicy);

module.exports = {
  NOW,
  timeProvider,
  makeContact,
  makeContactEmail,
  makePolicy,
  makeContactEmailCollection,
};
