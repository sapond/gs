'use strict';

angular.module('garagesalesApp')
  .controller('SalesCtrl', function ($scope, Sale) {
    $scope.sales = Sale.query();
  });
