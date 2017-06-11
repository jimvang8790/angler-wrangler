var myApp = angular.module('myApp', ['ngRoute', 'ngMap']);
/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    })
    .when('/catch', {
      templateUrl: '/views/catch.html',
      controller: "CatchController as cc"
    })
    .when('/update', {
      templateUrl: '/views/update.html',
      controller: "UserController as uc"
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);// end config
