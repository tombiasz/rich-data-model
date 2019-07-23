const chance = require('chance').Chance();
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

const makeContact = props => new Contact({
  id: chance.guid({ version: 4 }),
  ownerId: chance.guid({ version: 4 }),
  firstName: chance.first(),
  lastName: chance.last(),
  description: chance.paragraph(),
  emails: collectionMock,
  createdAt: chance.timestamp(),
  updatedAt: chance.timestamp(),
  ...props,
}, timeProvider);

const makeContactEmail = props => new ContactEmail({
  emailId: chance.guid({ version: 4 }),
  isStarred: false,
  createdAt: chance.timestamp(),
  updatedAt: chance.timestamp(),
  ...props,
}, timeProvider);

const makePolicy = ({
  returnSuccess = true,
  returnErrMsg = 'policy error',
} = {}) => ({
  check: jest.fn().mockReturnValue(returnSuccess),
  errorMessage: returnErrMsg,
});

const makeContactEmailCollection = ({
  // eslint-disable-next-line no-shadow
  aTimeProvider = timeProvider,
  aPolicy = makePolicy(),
} = {}) => new ContactEmailCollection(aTimeProvider, aPolicy);

module.exports = {
  NOW,
  timeProvider,
  makeContact,
  makeContactEmail,
  makePolicy,
  makeContactEmailCollection,
};
