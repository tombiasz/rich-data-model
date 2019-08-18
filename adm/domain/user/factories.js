const timeProvider = require('../../utils/timeProvider');
const User = require('./user');

const registerUser = ({
  id,
  username,
  createdAt,
  updatedAt,
}) => new User({
  id,
  username,
  createdAt: createdAt || timeProvider.now(),
  updatedAt: updatedAt || timeProvider.now(),
});

module.exports = {
  registerUser,
};
