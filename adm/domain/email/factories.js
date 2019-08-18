const timeProvider = require('../../utils/timeProvider');
const Email = require('./email');

const makeEmail = ({
  id,
  email,
  createdAt,
}) => new Email({
  id,
  email,
  createdAt: createdAt || timeProvider.now(),
});

module.exports = {
  makeEmail,
};
