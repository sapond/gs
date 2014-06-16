/* global _ */
'use strict';
angular.module('garageSalesApp')
    .controller('MapCtrl', function ($scope, $rootScope, location, sales, $q) {
        $scope.map = {center: {latitude: 0, longitude: 0}, zoom: 10};
        $scope.salesMarkers = [];
        $scope.useMyLocationPrompt = 'display:none';

        function centerMap(location) {
            $scope.map.center = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };
        }

        $q.all({location: location, sales: sales}).then(function(results) {
            console.log(sales);
            centerMap(results.location);
            $scope.salesMarkers = _.map(
                results.sales,
                function (sale, index) {
                    return { id: index + 1, latitude: window.parseFloat(sale.lat), longitude: window.parseFloat(sale.lng), title: 'foo'};
                }
            );
        });

        $rootScope.$on('error', function () {
            $scope.useMyLocationPrompt = {display: 'block'};
        });

    });
