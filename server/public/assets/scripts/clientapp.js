var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController"
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);
