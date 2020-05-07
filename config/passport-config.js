const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serailized');
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserialized user');
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(
      {
        usernameField: 'email'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({email});
          if (!user) {
            return done(null, false);
          }
          const isValid = await user.isValidPassword(password);
          if (!isValid) {
            return done(null, false);
          }
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
  ));
};
