'use strict'; angular.module('garageSalesApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'geolocation',
    'google-maps'
])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl',
                authenticate: true
            })
            .when('/signup', {
                templateUrl: 'partials/signup',
                controller: 'SignupCtrl'
            })
            .when('/settings', {
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl',
                authenticate: true
            })
            .when('/sales', {
                templateUrl: 'partials/sales.html',
                controller: 'SalesCtrl',
                resolve: {
                    sales: function(Sale) {
                        return Sale.query();
                    }
                }
            })
            .when('/sales/:saleId', {
                templateUrl: 'partials/sale.html',
                controller: 'SaleCtrl'
            })
            .when('/post', {
                templateUrl: 'partials/post.html',
                controller: 'PostCtrl'
            })
            .when('/map', {
                templateUrl: 'partials/map.html',
                controller: 'MapCtrl',
                resolve: {
                    sales: function(Sale) {
                        return Sale.query();
                    },
                    _location: function(geolocation) {
                        return geolocation.getLocation();
                    }
                }
            })
            .otherwise({
                redirectTo: '/sales'
            });

        $locationProvider.html5Mode(true);

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401) {
                        $location.path('/');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        }]);
    })
    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });
