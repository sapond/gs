'use strict';

angular.module('garageSalesApp')
  .controller('SalesCtrl', function ($scope, Sale, $rootScope) {
        $rootScope.sales = Sale.query();
  });
