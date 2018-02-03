'use strict';

angular.module('app.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user/:userid', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', function($scope, $rootScope, $http, $routeParams) {
        $scope.user = {};
        $http.get(apiurl + 'user/' + $routeParams.userid)
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.user = data.data;
            }, function(data) {
                console.log('no user');
            });
          $scope.featured_posts= featured_posts;
    });
