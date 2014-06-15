'use strict';

angular.module('garageSalesApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
