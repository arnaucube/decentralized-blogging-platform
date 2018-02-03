'use strict';

angular.module('app.write', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/write', {
            templateUrl: 'views/write/write.html',
            controller: 'WriteCtrl'
        });
    }])

    .controller('WriteCtrl', function($scope, $rootScope, $http) {
          $scope.content = "";
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
          }).subscribe('editableInput', function (event, editable) {
              // Do some work
              $scope.content = editable.innerHTML;
              console.log($scope.content);
          });

    });
