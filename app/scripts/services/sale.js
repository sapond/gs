'use strict';
angular.module('garagesalesApp')
    .factory('Sale', function($resource) {
        return $resource('/api/sales/:id', { id: '@id' });
    });
