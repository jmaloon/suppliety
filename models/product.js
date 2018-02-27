const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'brand'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  clicked: Number,
  created: Date,
  description: String,
  image: String,
  tags: [String],
  title: String,
  prices: Object,
  privacy: Boolean
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
