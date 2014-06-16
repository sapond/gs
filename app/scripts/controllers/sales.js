'use strict';

angular.module('garageSalesApp')
  .controller('SalesCtrl', function ($scope, Sale, sales) {
        $scope.sales = sales;
  });
