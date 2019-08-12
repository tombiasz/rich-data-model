const timeProvider = require('../../utils/timeProvider');
const UUID4 = require('../uuid4');
const Timestamp = require('../timestamp');
const User = require('./user');

const registerUser = ({
  id,
  username,
  createdAt,
  updatedAt,
}) => {
  const _id = new UUID4(id);
  const _createdAt = new Timestamp(createdAt || timeProvider.now());
  const _updatedAt = new Timestamp(updatedAt || timeProvider.now());

  return new User({
    id: _id.value,
    username,
    createdAt: _createdAt.value,
    updatedAt: _updatedAt.value,
  });
};

module.exports = {
  registerUser,
};
