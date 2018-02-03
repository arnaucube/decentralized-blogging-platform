'use strict';

angular.module('app.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'views/users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', function($scope, $rootScope, $http) {
      $scope.users = {};
      $http.get(apiurl + 'users')
          .then(function(data) {
              console.log('data success');
              console.log(data);
              $scope.users = data.data;
          }, function(data) {
              console.log('no user');
          });

    });
