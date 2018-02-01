'use strict';

angular.module('app.newmodel', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/newmodel', {
      templateUrl: 'views/newmodel/newmodel.html',
      controller: 'NewModelCtrl'
    });
  }])

  .controller('NewModelCtrl', function($scope, $rootScope, $http, toastr) {

    $scope.file = {};

    $scope.upload = function() {
      console.log("upload model");
      var formdata = new FormData();
      formdata.append("file", $scope.file);

      //add the file to ipfs
      /*$http({
          url: ipfs_url + 'add',
          method: "POST",
          headers: {
            "Content-Type": undefined
          },
          data: formdata
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data.data);
            toastr.success("Model added to IPFS");
          },
          function(data) {
            console.log(data);
            toastr.error("Error adding Model to IPFS");
          });*/

      //add the data to userdata
      $http({
              url: clienturl + 'model',
              method: "POST",
              headers: {
                  "Content-Type": undefined
              },
              data: $scope.model
          })
          .then(function(data) {
                  console.log("data: ");
                  console.log(data.data);
                  window.location="/";
                  toastr.success("Model uploaded");
              },
              function(data) {
                  console.log(data);
              });


    };



  })
  .directive('fileModel', ['$parse', function($parse) {
    //directive code from https://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);
