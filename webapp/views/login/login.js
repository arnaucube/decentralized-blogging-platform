'use strict';

angular.module('app.login', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'views/login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl', function($scope, $rootScope, $http, $routeParams, toastr) {
    $rootScope.server = ""
    $scope.user = {};

    $scope.login = function() {
      $http({
          url: apiurl + 'login',
          method: "POST",
          headers: {
            "Content-Type": undefined
          },
          data: $scope.user
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data.data);
            localStorage.setItem("dblog_user", JSON.stringify(data.data));
            window.location.reload();
          },
          function(data) {
            console.log(data);
          });

    };
  });
