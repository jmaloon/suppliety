const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'company' },
  companyAccepted: Boolean,
  connections: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  connectionRequestsSent: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  connectionRequestsReceived: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  created: Date,
  edited: Date,
  email: String,
  googleId: String,
  image: String,
  lists: Object,
  nameFirst: String,
  nameLast: String,
  phone: String,
  title: String,
  recentlyViewed: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  role: String,
  visibility: Boolean,
  whatsApp: String
});

UserSchema.pre('save', function(next) {
  Object.keys(this).forEach(key => {
    if (typeof this[key] === 'string') {
      this[key] = trim(this[key]);
    }
  });
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
