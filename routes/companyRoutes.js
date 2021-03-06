const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');
const adminRequired = require('../middlewares/adminRequired');

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
      if (!!user.company) throw Error('User can only be associated with one company');
      const company = new Company({
        ...req.body,
        created: Date.now()
      });
      company.accounts.push(user);
      user.company = company;
      user.admin = true;
      user.companyAccepted = true;

      await company.save();
      await user.save();
      const newCompany = await Company.findById(company._id);
      const newUser = await User.findById(user._id);
      res.send([newCompany, newUser]);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/api/company/:id', adminRequired, async (req, res) => {
    try {
      const { id } = req.params;
      const { companyData } = req.body;

      const company = await Company.findByIdAndUpdate(id, companyData, { new: true });
      if (!company) throw 'Company not found';

      res.send(company);
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

  app.post('/api/companies', async (req, res) => {
    try {
      const { ids } = req.body;
      const companies = await Company.find({ _id: { $in: ids } });
      res.send(companies);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/companies', async (req, res) => {
    try {
      const { limit, skip, sort } = req.query;
      const companies = await Company.find({})
        .sort(sort || { name: 1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip));
      res.send(companies);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
