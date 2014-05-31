'use strict';

angular.module('garagesalesApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
