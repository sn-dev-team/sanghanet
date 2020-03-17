const { PORT, CLIENT_ID, CLIENT_SECRET } = require('../config');

const passport = require('passport');

const { mongoose } = require('./mongoDB.controller');
const { User } = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const log4js = require('log4js');
const log = log4js.getLogger('controllers/passport.controller.js');

passport.serializeUser((userID, done) => {
    log.info(`serialize ${userID}`);
    done(null, userID);
});

passport.deserializeUser((userID, done) => {
    log.info(`deserialize ${userID}`);
    User.findOne({ _id: mongoose.Types.ObjectId(userID) })
        .then((identifiedUserObject) => {
            if (!identifiedUserObject) {
                log.info('deserialization failed');
                done(null, null);
            } else {
                log.info(`deserialized user as: ${identifiedUserObject.email}`);
                done(null, identifiedUserObject);
            }
            done(null, null);
        });
});

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/passport`
}, (identifier, refreshtoken, profile, done) => {
    log.info(profile);
    User.findOne({ email: profile.emails[0].value })
        .then((userObject) => {
            log.info(userObject);
            return userObject && userObject.isActive
                ? done(null, userObject.id)
                : done(null, null);
        }); // catch to handle DB errors with return done(err) ??
}));

module.exports = passport;