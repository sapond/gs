
'use strict';

angular.module('garageSalesApp')
  .controller('SaleCtrl', function ($scope, Sale, $routeParams) {
      $scope.sale = Sale.get({id: $routeParams.saleId});
  });
