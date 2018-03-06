const Company = require('../models/company');
const User = require('../models/user');
const loginRequired = require('../middlewares/loginRequired');
const adminRequired = require('../middlewares/adminRequired');

module.exports = app => {
  app.post('/api/company/accountRequest/:id', loginRequired, async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      if (!!user.company) throw Error('User can only be associated with one company');
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
  });

  app.post('/api/company/acceptAccountRequest', adminRequired, async (req, res) => {
    try {
      const { user } = req;
      const { joinerId } = req.body;

      const company = await Company.findById(user.company);
      const accountRequests = company.accountRequests.filter(account => account === joinerId);
      if (accountRequests.length === company.accountRequests.length) throw 'Request is no longer valid';
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
      res.status(400).send(err);
    }
  });

  app.post('/api/company/requestCompanyConnection', loginRequired, async (req, res) => {
    try {
      const { companyId } = req.body;
      const otherCompany = await Company.findById(companyId);
      const myCompany = await Company.findById(req.user.company);

      myCompany.connectionRequestsSent.push(otherCompany);
      otherCompany.connectionRequestsReceived.push(myCompany);

      await myCompany.save();
      await otherCompany.save();

      const newOtherCompany = await Company.findById(companyId);
      const newMyCompany = await Company.findById(req.user.company);

      res.send([newOtherCompany, newMyCompany]);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/company/acceptCompanyConnection', adminRequired, async (req, res) => {
    try {
      const { companyId } = req.body;
      const otherCompany = await Company.findById(companyId);
      const myCompany = await Company.findById(req.user.company);

      //remove companies from both request lists
      myCompany.connectionRequestsSent = myCompany.connectionRequestsSent.filter(c => c === companyId);
      myCompany.connectionRequestsReceived = myCompany.connectionRequestsReceived.filter(c => c === companyId);
      otherCompany.connectionRequestsSent = otherCompany.connectionRequestsSent.filter(c => c === req.user.company);
      otherCompany.connectionRequestsReceived = otherCompany.connectionRequestsReceived.filter(c => c === req.user.company);
      //add companies to connections list
      otherCompany.connections.push(myCompany);
      myCompany.connections.push(otherCompany);

      await myCompany.save();
      await otherCompany.save();

      const newOtherCompany = await Company.findById(companyId);
      const newMyCompany = await Company.findById(req.user.company);

      res.send([newOtherCompany, newMyCompany]);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
