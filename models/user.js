const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  companyAccepted: Boolean,
  created: Date,
  edited: Date,
  email: String,
  googleId: String,
  image: String,
  lists: Object,
  mobile: String,
  nameFirst: String,
  nameLast: String,
  title: String,
  recentlyViewed: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  role: String,
  visibility: Boolean,
  whatsApp: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
