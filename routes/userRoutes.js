const User = require('../models/user');

module.exports = app => {
  app.patch('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    //
    // try {
    //   const user = await User.findById(id);
    //   res.send(user);
    // } catch (err) {
    //   res.status(400).send('no good');
    // }
    const { nameFirst = '', nameFamily = '', email = '' } = req.body;
    const body = {
      nameFirst,
      nameFamily,
      email,
      edited: Date.now()
    };
    try {
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      res.send(user);
    } catch (err) {
      res.status(400).send(id);
    }
  });
};
