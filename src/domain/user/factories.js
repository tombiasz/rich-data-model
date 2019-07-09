const timeProvider = require('../../utils/timeProvider');
const UUID4 = require('../uuid4');
const User = require('./user');

const registerUser = ({
  id,
  username,
  createdAt,
  updatedAt,
}) => {
  const _id = new UUID4(id);
  const _createdAt = createdAt || timeProvider.now();
  const _updatedAt = updatedAt || timeProvider.now();

  return new User({
    id: _id.value,
    username,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  });
};

module.exports = {
  registerUser,
};
