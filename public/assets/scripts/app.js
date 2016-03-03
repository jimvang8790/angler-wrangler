var myApp = angular.module('myApp', []);

myApp.controller('UserController', ['$scope', '$http', function($scope, $http) {
    $scope.userName;

    $http.get('/user').then(function(response) {
        $scope.userName = response.data.username;
        console.log('User Data: ', $scope.userName);
    });
}]);