const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const URL_SERVER = require('../config/constants').URL;
const PORT = require('../config/constants').PORT;
const GOOGLE_CLIENT_ID = require('../config/constants').GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = require('../config/constants').GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = require('../config/constants').GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = require('../config/constants').GITHUB_CLIENT_SECRET;

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: URL_SERVER + PORT + "/googleoauth2/google/callback/",
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    passReqToCallback: true

  },
    function verify(request, accessToken, refreshToken, profile, cb) {
      console.log(accessToken);
      console.log(profile);
      const user = { name : profile.displayName, accessToken: accessToken};
      return cb(null, user);
    }
  ));


passport.use(
  new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: URL_SERVER + PORT + "/googleoauth2/github/callback/",
    scope: ['read:user', 'user:email'],
    passReqToCallback: true

  },
    function verify(request, accessToken, refreshToken, profile, cb) {
      console.log(accessToken);
      console.log(profile);
    }
  ));

passport.serializeUser((user, done) => { done(null, user) });

passport.deserializeUser((obj, done) => { done(null, obj) });

module.exports = passport;