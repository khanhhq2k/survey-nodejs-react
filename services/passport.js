const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //transform user.id to token to save to cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // turn id to system user
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //user already exists => return
        //done is for passport, its first params is error, second params is user
        return done(null, existingUser);
      }
      // Create new user if not existing
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
