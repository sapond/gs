'use strict';

angular.module('garageSalesApp')
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {
        // Get currentUser from cookie
        $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');

        return {
            /**
             * Unauthenticate user
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            logout: function(callback) {
                var cb = callback || angular.noop;

                return Session.delete(function() {
                        $rootScope.currentUser = null;
                        return cb();
                    },
                    function(err) {
                        return cb(err);
                    }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            currentUser: function() {
                return User.get();
            },

            /**
             * Simple check to see if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function() {
                var user = $rootScope.currentUser;
                return !!user;
            }
        };
    });
