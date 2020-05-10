const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

  passport.use(new GoogleStrategy(
      // options for google strategy
      {
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function executed during /auth/google/redirect
        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id
          }).save();
          done(null, newUser);
        }
      })
  );
};
