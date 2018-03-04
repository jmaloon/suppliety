const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  about: String,
  accounts: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  accountRequests: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  address: String,
  connections: [{ type: Schema.Types.ObjectId, ref: 'company' }],
  connectionRequestsSent: [{ type: Schema.Types.ObjectId, ref: 'company' }],
  connectionRequestsReceived: [{ type: Schema.Types.ObjectId, ref: 'company' }],
  country: String,
  created: Date,
  email: String,
  facebook: String,
  instagram: String,
  name: {
    type: String,
    required: true
  },
  phone: String,
  image: String,
  policies: [Object],
  subtype: String,
  type: String
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;
