const Company = require('../models/company');
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {
  app.post('/api/company/new', loginRequired);
};
