const uuid4 = require('uuid4');
const isNil = require('lodash.isnil');
const UUID4 = require('./uuid4');

class AutogenerateUUID4 extends UUID4 {
  constructor(value) {
    const _value = isNil(value) ? uuid4() : value;
    super(_value);
  }
}

module.exports = AutogenerateUUID4;
