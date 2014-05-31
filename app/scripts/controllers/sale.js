
'use strict';

angular.module('garagesalesApp')
  .controller('SaleCtrl', function ($scope, Sale, $routeParams) {
      $scope.sale = Sale.get({id: $routeParams.saleId});
  });
