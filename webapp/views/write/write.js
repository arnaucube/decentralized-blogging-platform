'use strict';

angular.module('app.write', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/write', {
      templateUrl: 'views/write/write.html',
      controller: 'WriteCtrl'
    });
  }])

  .controller('WriteCtrl', function($scope, $rootScope, $http, toastr) {
    $scope.post = {
      title: "",
      content: "",
      summary: ""
    };
    var editor = new MediumEditor('.editable', {
      toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
      },
      autoLink: true,
      placeholder: {
        text: 'Start to writting your decentralized blog post...'
      }
    }).subscribe('editableInput', function(event, editable) {
      // Do some work
      $scope.post.content = editable.innerHTML;
    });


    $scope.publicate = function() {
      //add the thumbimg to ipfs
      var formdata = new FormData();
      formdata.append("file", $scope.file);
      $http({
          url: ipfsurl + 'add',
          method: "POST",
          headers: {
            "Content-Type": undefined
          },
          data: formdata
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data.data);
            $scope.post.thumbimg = data.data.Hash;
            toastr.success("Thumb image added to IPFS");
            $scope.publicate2();
          },
          function(data) {
            console.log(data);
            toastr.error("Error adding Model to IPFS");
          });
    };
    $scope.publicate2 = function() {
      //$scope.post.thumbimg = hash;
      //send the post content to the Go api, that will add the html content to ipfs
      console.log("post", $scope.post);
      $http({
          url: apiurl + 'post',
          method: "POST",
          headers: {
            "Content-Type": undefined
          },
          data: $scope.post
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data.data);
            window.location = "#!/main";
          },
          function(data) {
            console.log(data);
          });

    };
  }).directive('fileModel', ['$parse', function($parse) {
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
