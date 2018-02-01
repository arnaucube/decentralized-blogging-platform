'use strict';

angular.module('app.profile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'views/profile/profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl', function($scope, $rootScope, $http) {

        $http.get(clienturl + 'user')
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.user = data.data;
                localStorage.setItem("ai_user", JSON.stringify($scope.user));

            }, function(data) {
                console.log('no user');
            });
    });
