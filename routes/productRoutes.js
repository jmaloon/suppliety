const Product = require('../models/product');
const Company = require('../models/company');
const Brand = require('../models/brand');
const companyRequired = require('../middlewares/companyRequired');

module.exports = app => {
  //add new product
  app.post('/api/product/new', companyRequired, async (req, res) => {
    try {
      const { productData: { title, description, tags, brand } } = req.body;

      const company = await Company.findById(req.user.company);
      const data = {
        title,
        description,
        tags,
        company,
        created: Date.now(),
        clicked: 0
      };
      // if (brand) data.brand = await Brand.findById(productBrand)

      const product = await new Product(data).save();
      company.products.push(product);
      await company.save();

      const newProduct = await Product.findById(product._id);
      const newCompany = await Company.findById(req.user.company);
      res.send([newProduct, newCompany]);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/api/product/edit', companyRequired, async (req, res) => {
    try {
      const { productData: { _id, title, description, tags, brand } } = req.body;

      const company = await Company.findById(req.user.company);
      if (!company.products.map(p => p.toString()).includes(_id)) throw 'This product does not belong to your company.';
      
      const data = {
        title,
        description,
        tags
      };

      const product = await Product.findByIdAndUpdate(_id, data, { new: true });
      res.send(product);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/api/products/fetch', async (req, res) => {
    try {
      const { productIds } = req.body;
      const products = await Product.find({ _id: { $in: productIds } });
      res.send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
