'use strict';

angular.module('app.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function($scope, $rootScope, $http) {


      $scope.user = user;
      $scope.featured_posts= featured_posts;
      $scope.posts = posts;

    });
