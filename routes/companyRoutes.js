const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {
  app.post('/api/company/new', loginRequired, async (req, res) => {
    try {
      const { user } = req;
      if (!!user.company)
        throw Error('User can only be associated with one company');
      const company = new Company({
        ...req.body,
        created: Date.now()
      });
      company.accounts.push(user);
      user.company = company;
      user.role = 'admin';
      user.companyAccepted = true;

      await company.save();
      await user.save();
      res.send([company, user]);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/company/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findById(id);
      res.send(company);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
