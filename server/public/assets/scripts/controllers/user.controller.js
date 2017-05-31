myApp.controller('UserController', ['$http', '$location', 'NgMap', function($http, $location, NgMap) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
  console.log('checking user');

  console.log('checking user');
    NgMap.getMap().then(function(map) {

      vm.showCustomMarker = function(evt) {
        map.customMarkers.foo.setVisible(true);
        map.customMarkers.foo.setPosition(this.getPosition());
      };

      vm.closeCustomMarker= function(evt) {
        this.style.display = 'none';
      };
    });

  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.userName = response.data.username;
          console.log('User Data: ', vm.userName);
      }// end if
      else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }// end else
  });// end $http.get

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };// end logout

  //get items from database
  vm.getItems = function() {
    console.log('getting items');
    $http({
      method: 'GET',
      url: '/user/getItems',
    }).then(function(response){
      console.log('this is the response.data:', response.data);
      vm.item = response.data;
    });
  };// end getItems

  vm.getItems();

  //get pictures from database
  vm.getPictures = function() {
    console.log('getting pictures');
    $http({
      method: 'GET',
      url: '/user/getPictures',
    }).then(function(response) {
      console.log('this is the response.data for picture', response.data);
      vm.picture = response.data;
    });
  };// end getPictures

  vm.getPictures();

}]);// end UserController
