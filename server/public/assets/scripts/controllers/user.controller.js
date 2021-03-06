myApp.controller('UserController', ['$http', '$location', 'NgMap', '$scope', function($http, $location, NgMap, $scope) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
  console.log('checking user');

  // Google Map API
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
          $location.path('/home');
      }// end else
  });// end $http.get

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path('/home');
    });
  };// end logout

  //get items from database
  vm.getItems = function() {
    console.log('getting items');
    $http({
      method: 'GET',
      url: '/user/getItems',
    }).then(function(response){
      console.log('this is the response for get items:', response.data);
      vm.item = response.data;
    });
  };// end getItems

  vm.getItems();// call function inorder to see logs

  // removing a catch/fish in the database
  vm.removeFish = function(itemsId) {
   console.log('delete button click!');
   console.log('Item id to remove is:', itemsId);
  // begin swal(pop-up message)
   swal({
    title: "Are you sure?",
    text: "You will not be able to catch this fish again!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, release it!",
    closeOnConfirm: false
   },
   function(){
     swal("Released!", "You have released this fish.", "success");
     // put $http call in here so when cancel btn click it will not delete the fish
     $http({
       method: 'DELETE',
       url: '/user/remove',
       params: {id: itemsId}
     }).then(function(response) {
       console.log('delete response:', response);
       vm.getItems(); // call getItems here so DOM update immediately
     });// end $http
   });// end function for cancel, and end swal

  };// end removeFish

  // updating a catch/fish in the database
  vm.updateFish = function(fish) {
    console.log('update button click', fish);
    var objectToSend = {
      _id: fish,
      username: vm.usernameIn,
      imgUrl: vm.img,
      type: vm.typeIn,
      size: vm.sizeIn,
      weight: vm.weightIn,
      date: vm.dateIn,
      location: vm.locationIn,
      latitude: vm.lat,
      longitude: vm.lng,
      description: vm.descriptionIn
    };// end objectToSend
    console.log('update objectToSend', objectToSend);
    $http({
      method: 'PUT',
      url: '/user/update',
      data: objectToSend
    }).then(function(response) {
      console.log('update logs:', response.data);
      // begin swal
      swal("Fish Updated!");
      vm.getItems();
    });
  };// end updateFish

}]);// end UserController
