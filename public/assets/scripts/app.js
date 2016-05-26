var myApp = angular.module('myApp', []);

myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function(response) {
        console.log('user?', response.data);
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA
          // $location.path('/views/user.html');
          $window.location.href = '/views/user.html';
        } else {
          console.log('failure: ', response);
          $scope.message = "Fail!!";
        }
      });
    }
}]);

myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  // This happens after page load, which means it has authenticated if it was ever going to
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $window.location.href = '/index.html';
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $window.location.href = '/index.html';
    });
  }
}]);
