const User = require('../models/user');

module.exports = app => {
  app.post('/api/user/new', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });

    const existingUser = await User.findOne({ email });
    if (!!existingUser) {
      return res.status(400).send('User already exists');
    }
    await user.save();
    res.send(user);
  });
};
