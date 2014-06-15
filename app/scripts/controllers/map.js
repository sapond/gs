'use strict';
angular.module('garageSalesApp')
    .controller('MapCtrl', function ($scope, $rootScope, geolocation, $q) {

        $scope.map = {center: {latitude: 0, longitude: 0}, zoom: 10};
        $scope.useMyLocationPrompt = 'display:none';

        function centerMap(geoPosition) {
            $scope.map.center = {
                latitude: geoPosition.coords.latitude,
                longitude: geoPosition.coords.longitude
            };
        }

        $scope.salesMarkers = _.map(
            $scope.sales,
            function (sale, index) {
                return { id: index + 1, latitude: window.parseFloat(sale.lat), longitude: window.parseFloat(sale.lng), title: 'foo'}
            }
        );

        $q.when(geolocation.getLocation(), centerMap);

        $rootScope.$on('error', function () {
            $scope.useMyLocationPrompt = {display: 'block'};
        });

    });
