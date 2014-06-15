'use strict';
angular.module('garageSalesApp')
    .factory('Sale', function($resource) {
        return $resource('/api/sales/:id', { id: '@id' });
    });
