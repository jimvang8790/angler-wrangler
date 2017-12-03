myApp.controller('LoginController', ['$http', '$location', function($http, $location) {
  console.log('LoginController loaded');
    var vm = this;

    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('here', vm.user);
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Please enter your username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/user');
          } else {
            console.log('failure: ', response);
            vm.message = "Invalid username or password!";
          }
        });
      }
    };

    vm.registerUser = function() {
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('success');
          $location.path('/login');
        },
        function(response) {
          console.log('error');
          vm.message = "Please try again.";
        });
      }
      swal("Account Created!", "Login in to access Angler Wrangler!", "success");
    };
}]);
