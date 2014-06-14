'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    sales = require('./controllers/sales'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

/**
 * Application routes
 */
module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete Facebook profile is serialized
    //   and deserialized.

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_KEY,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: "http://dev01.dev:9000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            users.findOrCreate({
                facebookId: profile.id
            },
            function(err, user) {
                return done(err, user);
            });
        }
    ));

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);

    app.route('/api/sales/:id')
        .all(ensureAuthenticated)
        .get(sales.show);

    app.get('/auth/facebook', passport.authenticate('facebook'), function() {});

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook'), function(req, res) {
            res.redirect('/');
        });

    app.route('/api/sales')
        .all(ensureAuthenticated)
        .post(sales.create)
        .get(sales.index);

    app.route('/api/users/me')
        .all(ensureAuthenticated)
        .get(users.me);

    app.route('/api/users/:id')
        .all(ensureAuthenticated)
        .get(users.show);

    app.route('/api/session')
        .post(session.login)
        .delete(session.logout);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function(req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(middleware.setUserCookie, index.index);

};
