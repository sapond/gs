/* global _ */ 'use strict';
angular.module('garageSalesApp')
    .controller('MapCtrl', function ($scope, $rootScope, $q) {
        $scope.map = {center: {latitude: 0, longitude: 0}, zoom: 10};
        $scope.salesMarkers = [];
        $scope.useMyLocationPrompt = 'display:none';

        function centerMap(_location) {
            $scope.map.center = {
                latitude: _location.coords.latitude,
                longitude: _location.coords.longitude
            };
        }

        $q.all([$scope._location, $scope.sales.$promise])
            .then(function(results) {
                centerMap(results[0]);
                $scope.salesMarkers = _.map(
                    results[1],
                    function (sale, index) {
                        return {
                            id: index + 1,
                            latitude: window.parseFloat(sale.lat),
                            longitude: window.parseFloat(sale.lng),
                            title: 'foo'
                        };
                    }
                );
            });

        $rootScope.$on('error', function () {
            $scope.useMyLocationPrompt = {display: 'block'};
        });

    });
