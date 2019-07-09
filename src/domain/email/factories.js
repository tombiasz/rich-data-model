const timeProvider = require('../../utils/timeProvider');
const Email = require('./email');
const EmailAddress = require('./emailAddress');

const makeEmail = ({
  email,
  createdAt,
}) => {
  const _email = new EmailAddress(email);
  const _createdAt = createdAt || timeProvider.now();

  return new Email({
    email: _email.value,
    createdAt: _createdAt,
  });
};

module.exports = {
  makeEmail,
};
