'use strict';

var apiurl = "http://127.0.0.1:3000/";
var ipfsurl = "http://127.0.0.1:5001/api/v0/";

angular.module('app', [
  'ngRoute',
  'ngMessages',
  'toastr',
  'chart.js',
  'app.navbar',
  'app.signup',
  'app.login',
  'app.main',
  'app.newmodel',
  'app.users',
  'app.user',
  'app.post',
  'app.write'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    /*$routeProvider.otherwise({
      redirectTo: '/main'
    });*/
console.log("window", window.location.hash);
    if((localStorage.getItem('dblog_user')))
      {
        if((window.location.hash==='#!/login')||(window.location.hash==='#!/signup'))
        {
          window.location='#!/main';
        }

        $routeProvider.otherwise({redirectTo: '/main'});
      }else{
        if((window.location.hash!=='#!/login')||(window.location.hash!=='#!/signup')||(window.location.hash!=='#!/main')||(window.location.hash!=='#!/user'))
        {
          console.log('app, user no logged');

          localStorage.removeItem('dblog_user');
          localStorage.removeItem('dblog_user');
          //window.location='#!/main';
          $routeProvider.otherwise({redirectTo: '/main'});
        }
      }
  }])
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  })
  .factory('httpInterceptor', function httpInterceptor() {
    return {
      request: function(config) {
        return config;
      },

      requestError: function(config) {
        return config;
      },

      response: function(res) {
        return res;
      },

      responseError: function(res) {
        return res;
      }
    };
  })
  .factory('api', function($http) {
    return {
      init: function() {
        /*console.log("http", $http.options);
        var dblog_user = JSON.parse(localStorage.getItem('dblog_user'));
        if (dblog_user) {
          $http.defaults.headers.common['Authorization'] = dblog_user.token;
          $http.defaults.headers.post['Authorization'] = dblog_user.token;
        }*/
      }
    };
  })
  .run(function(api) {
    api.init();
  })
  .config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    'http://localhost:8080/**'
  ]);
});
