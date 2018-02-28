const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {
  app.post('/api/company/new', loginRequired, async (req, res) => {
    // res.send(req.user);
    try {
      const company = await new Company({
        ...req.body,
        created: Date.now()
      }).save();
      const user = await User.findById(req.user._id);
      if (!!user.company)
        throw Error('User can only be associated with one company');
      user.company = company;
      await user.save();
      res.send([company, user]);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
