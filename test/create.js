const assert = require('assert');
const User = require('../models/user');

describe('Creating records', () => {
  it('should create a user', done => {
    const josh = new User({ name: 'Josh Maloon', email: 'example@email.com' });
    josh.save().then(() => {
      User.findOne({ name: josh.name }).then(() => {
        assert(!josh.isNew);
        done();
      });
    });
  });
});
