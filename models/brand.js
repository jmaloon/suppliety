const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  image: String,
  name: String,
  country: String
});

const Brand = mongoose.model('brand', BrandSchema);

module.exports = Brand;
