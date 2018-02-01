'use strict';

angular.module('app.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', function($scope, $rootScope, $http) {

        /*$http.get(apiurl + 'user/' + )
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.user = data.data;
            }, function(data) {
                console.log('no user');
            });*/
            //fake data
          $scope.user = {
            username: "mark_zuckerberg",
            name: "Mark",
            lastname: "Zuckerberg",
            description: "Hi all, I'm here to write decentralized blog posts.",
            twitter: "arnaucode",
            github: "arnaucode",
            posts: [
              {
                title: "This is the second post",
                subtitle: "this is the subtitle of the second post",
                img: "https://cdn-images-1.medium.com/fit/t/800/240/1*4_E6m7J0112DBi1Lmdniiw.png",
                content: "Some quick example text to build on the card title and make up the bulk of the card's content."
              },
              {
              title: "This is the first post",
              subtitle: "this is the subtitle of the first post",
              img: "https://bootstrap-themes.github.io/application/assets/img/unsplash_1.jpg",
              content: "Some quick example text to build on the card title and make up the bulk of the card's content."
            }
            ]
          };
          $scope.featured_posts= [
            {
              title: "Thinking about python development",
              subtitle: "this is the subtitle of the second post",
              img: "https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png",
              content: "Some quick example text to build on the card title and make up the bulk of the card's content."
            },
            {
            title: "Thinking about G",
            subtitle: "this is the subtitle of the first post",
            img: "https://cdn-images-1.medium.com/max/1600/1*RNkyx-Zq7w61eR74nMYgnA.jpeg",
            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
          }
          ]
    });
