'use strict';

angular.module('app.post', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/post/:postid', {
            templateUrl: 'views/post/post.html',
            controller: 'PostCtrl'
        });
    }])

    .controller('PostCtrl', function($scope, $rootScope, $http, $routeParams) {
        $scope.post = {};
        $scope.user = {};
        $http.get(apiurl + 'post/' + $routeParams.postid)
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.post = data.data;
                $scope.user = $scope.post.user;
            }, function(data) {
                console.log('no user');
            });
    });
