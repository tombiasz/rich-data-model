const timeProvider = require('../../utils/timeProvider');
const UUID4 = require('../uuid4');
const Timestamp = require('../timestamp');
const Email = require('./email');
const EmailAddress = require('./emailAddress');

const makeEmail = ({
  id,
  email,
  createdAt,
}) => {
  const _id = new UUID4(id);
  const _email = new EmailAddress(email);
  const _createdAt = new Timestamp(createdAt || timeProvider.now());

  return new Email({
    id: _id.value,
    email: _email.value,
    createdAt: _createdAt.value,
  });
};

module.exports = {
  makeEmail,
};
