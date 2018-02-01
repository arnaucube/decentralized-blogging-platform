'use strict';

var apiurl = "http://127.0.0.1:3000/";

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
  'app.user'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    /*$routeProvider.otherwise({
      redirectTo: '/main'
    });*/

    if((localStorage.getItem('dblog_user')))
      {
        console.log(window.location.hash);
        if((window.location.hash==='#!/login')||(window.location.hash==='#!/signup'))
        {
          window.location='#!/main';
        }

        $routeProvider.otherwise({redirectTo: '/main'});
      }else{
        if((window.location!=='#!/login')||(window.location!=='#!/signup')||(window.location!=='#!/main'))
        {
          console.log('app, user no logged');

          localStorage.removeItem('dblog_user');
          localStorage.removeItem('dblog_user');
          window.location='#!/main';
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
        var dblog_user = JSON.parse(localStorage.getItem('dblog_user'));
        if (dblog_user) {
          $http.defaults.headers.common['Authorization'] = dblog_user.token;
          $http.defaults.headers.post['Authorization'] = dblog_user.token;
        }
      }
    };
  })
  .run(function(api) {
    api.init();
  });
