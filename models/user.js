const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  admin: Boolean,
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
  visibility: Boolean,
  whatsApp: String,
  username: String,
  password: String
});

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

UserSchema.methods.verifyPassword = function(password) {
  // return bcrypt.compareSync(password, this.local.password);
  return password === this.password;
};

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
