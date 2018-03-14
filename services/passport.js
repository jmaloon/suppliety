const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      let user = await User.findOne({ username });
      // if (!user || !user.verifyPassword(password)) return done(null, false);
      if (!user)
        user = await new User({
          username,
          password
        }).save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// passport.use(
//   'local-signup',
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) throw 'Username already taken';
//       const newUser = await new User({
//         username,
//         password
//       }).save();
//       return done(null, newUser);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);
        const newUser = await new User({
          googleId: profile.id,
          created: Date.now()
        }).save();
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
