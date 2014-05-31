'use strict';

angular.module('garagesalesApp')
  .controller('PostCtrl', function ($scope, Sale, $location) {
    $scope.errors = {};
    $scope.post = {
        name: 'foo'
    };

    $scope.postSubmit = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Sale.save({
            headline: $scope.post.headline,
            description: $scope.post.description,
            addr1: $scope.post.address,
            addr2: $scope.post.address2,
            city: $scope.post.city,
            state: $scope.post.state,
            zip: $scope.post.zip,
        })
        .$promise
        .then( function() {
          $location.path('/sales');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
