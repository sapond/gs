'use strict';

angular.module('garageSalesApp')
  .controller('SalesCtrl', function ($scope, Sale) {
    $scope.sales = Sale.query();
  });
