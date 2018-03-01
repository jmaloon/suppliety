const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {
  app.get('/api/company/count', async (req, res) => {
    try {
      const count = await Company.count({});
      res.send({ count });
    } catch (err) {
      res.status(400).send(err);
    }
  });

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

  app.get('/api/companies', async (req, res) => {
    try {
      const { limit, skip } = req.query;
      const companies = await Company.find({})
        .sort({ name: 1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      res.send(companies);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
