'use strict';

angular.module('app.post', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/post', {
            templateUrl: 'views/post/post.html',
            controller: 'PostCtrl'
        });
    }])

    .controller('PostCtrl', function($scope, $rootScope, $http) {

        /*$http.get(apiurl + 'user/' + )
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.user = data.data;
            }, function(data) {
                console.log('no user');
            });*/
            //fake data
          $scope.user = user;
          $scope.post = user.posts[0];
    });
