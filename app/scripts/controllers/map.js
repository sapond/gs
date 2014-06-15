/*jslint indent: 4 */
'use strict';

angular.module('garageSalesApp')
  .controller('MapCtrl', function ($scope, geolocation, $rootScope) {

    $scope.useMyLocationPrompt = 'display:none';
    $scope.sales = [{latitude:32, longitude: -96, id:1}];


    var setCenter = function() {
        $scope.map = {
            center: {
                latitude: $scope.coords?$scope.coords.lat:0,
                longitude: $scope.coords?$scope.coords.long:0
            },
            zoom: 10
        };
    };

    setCenter();

    geolocation.getLocation()
        .then(function(data){
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
            setCenter();
        });

    $rootScope.$on('error', function() {
        setCenter();
        $scope.useMyLocationPrompt = {display:'block'};
    });

});
