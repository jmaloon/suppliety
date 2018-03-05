const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');
const adminRequired = require('../middlewares/adminRequired');

module.exports = app => {
  app.post(
    '/api/company/accountRequest/:id',
    loginRequired,
    async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        if (!!user.company)
          throw Error('User can only be associated with one company');
        const company = await Company.findById(id);

        company.accountRequests.push(user);
        user.company = company;
        user.admin = false;
        user.companyAccepted = false;

        await company.save();
        await user.save();
        const newCompany = await Company.findById(company._id);
        const newUser = await User.findById(user._id);
        res.send([newCompany, newUser]);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  app.post(
    '/api/company/acceptAccountRequest',
    adminRequired,
    async (req, res) => {
      try {
        const { user } = req;
        const { joinerId } = req.body;

        const company = await Company.findById(user.company);
        const accountRequests = company.accountRequests.filter(
          account => account === joinerId
        );
        if (accountRequests.length === company.accountRequests.length)
          throw 'Request is no longer valid';
        const joiner = await User.findById(joinerId);
        company.accounts.push(joiner);
        company.accountRequests = accountRequests;
        joiner.companyAccepted = true;
        await company.save();
        await joiner.save();
        const newCompany = await Company.findById(company._id);
        const newUser = await User.findById(joinerId);
        res.send([newCompany, newUser]);
      } catch (err) {
        res.send(err);
      }
    }
  );
};