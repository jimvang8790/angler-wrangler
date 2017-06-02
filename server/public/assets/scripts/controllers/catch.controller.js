myApp.controller('CatchController', ['$http', '$location', 'NgMap', '$scope', function($http, $location, NgMap, $scope){
  console.log('CatchController loaded');

  // global variable
  var vm = this;
  vm.lat = '';
  vm.lng = '';

  // add a new catch to mongoDB
  vm.addFish = function() {
    console.log('add fish button click');
    // what is being sent to mongoDB and should mirror ItemSchema
    var objectToSend = {
      username: vm.usernameIn,
      imgUrl: vm.img,
      type: vm.typeIn,
      size: vm.sizeIn,
      weight: vm.weightIn,
      location: vm.locationIn,
      description: vm.descriptionIn
    };// end objectToSend
    console.log('objectToSend->', objectToSend);
    // items to send to mongoDB
    console.log('items to send to mongoDB');
    $http({
      method: 'POST',
      url: '/catch',
      data: objectToSend
    }).then(function(response){
      console.log('back from the server with', response);
      // vm.getLocation(); // NOTE add this later
    });// end $http
    // clear the input field after entering info
    vm.usernameIn='';
    vm.typeIn='';
    vm.sizeIn='';
    vm.weightIn='';
    vm.locationIn='';
    vm.descriptionIn='';
  };// end addFish

  // NOTE Goolge Map API call
  NgMap.getMap().then(function(map) {
    vm.showCustomMarker= function(evt) {
      map.customMarkers.foo.setVisible(true);
      map.customMarkers.foo.setPosition(this.getPosition());
    };
    vm.closeCustomMarker= function(evt) {
      this.style.display = 'none';
    };// end closeCustomMarker
  });// end getMap

   //NOTE to display latitude and longitude
   vm.getLocation = function() {
     console.log('Getting location, please wait...');
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(vm.showPosition);
    }// end if
    else {
        // vm.demo.innerHTML = 'Geolocation is not supported by this browser.';
    }// end else
   };// end getLocation

   vm.showPosition = function(position) {
     console.log('this is your geolocation', position);
     vm.lat = position.coords.latitude;
     vm.lng = position.coords.longitude;
     console.log('vm.lat', vm.lat);
     console.log('vm.lng', vm.lng);
     $scope.$apply();// trigger the digest cycle or will have to
   };// end showPosition

   //NOTE add latitude and longitude to mongoDB
   vm.addLocation = function() {
     console.log('add location button click');
     var locationToSend = {
       username: vm.usernameIn,
       latitude: vm.lat,
       longitude: vm.lng
    };// end locationToSend
    console.log('locationToSend->', locationToSend);
    // location to send to mongoDB
    console.log('location to send to mongoDB');
    $http({
      method: 'POST',
      url: '/location',
      data: locationToSend
    }).then(function(response) {
      console.log('back from the server with location response', response);
    });// end $http
    // clear the input field after entering info
    vm.usernameIn='';
    vm.lat='';
    vm.lng='';
   };// end addLocation

   // uploading an image to filestack
   vm.uploadImg = filestack.init('AHwdt1GnnReXiWuvTKZB7z');
   vm.showPicker = function() {
     vm.uploadImg.pick({
     }).then(function(response){
       console.log('upload this img', (response.filesUploaded[0].url));
       vm.img=response.filesUploaded[0].url;
     });
   };// end showPicker

}]);// end controller
