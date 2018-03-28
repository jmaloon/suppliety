const User = require('../models/user');
const Product = require('../models/product');
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {
  app.patch('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { nameFirst, nameLast, email, phone, title, whatsApp } = req.body;
    const body = {
      nameFirst,
      nameLast,
      email,
      phone,
      title,
      whatsApp,
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

  app.post('/api/user/addProduct', loginRequired, async (req,res) => {
    try {
      const { productId } = req.body;
      
      const product = await Product.findById(productId);
      if (!product) throw 'Cannot find product';

      const user = await User.findById(req.user._id);
      user.products.push(product);
      await user.save();
      
      const updatedUser = await User.findById(req.user._id);
      res.send(updatedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  })

  app.post('/api/user/removeProduct', loginRequired, async (req,res) => {
    try {
      const { productId } = req.body;

      const user = await User.findById(req.user._id);
      user.products = user.products.filter(p => p.toString() !== productId );
      await user.save();
      
      const updatedUser = await User.findById(req.user._id);
      res.send(updatedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  })
};
