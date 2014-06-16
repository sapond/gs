/* global _ */
'use strict';
angular.module('garageSalesApp')
    .controller('CombinedCtrl', function ($scope, _location, sales) {
        $scope.sales = sales;
        $scope._location = _location;
    });
