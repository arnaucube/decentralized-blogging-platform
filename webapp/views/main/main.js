'use strict';

angular.module('app.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function($scope, $rootScope, $http) {


      $scope.posts = {};
      $http.get(apiurl + 'posts')
          .then(function(data) {
              console.log('data success');
              console.log(data);
              $scope.posts = data.data;
          }, function(data) {
              console.log('no user');
          });

    });
