const User = require('../models/user');

module.exports = app => {
  app.patch('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { nameFirst, nameLast, email } = req.body;
    const body = {
      nameFirst,
      nameLast,
      email,
      edited: Date.now()
    };

    try {
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const { ids } = req.body;
      const users = await User.find({ _id: { $in: ids } });
      res.send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
