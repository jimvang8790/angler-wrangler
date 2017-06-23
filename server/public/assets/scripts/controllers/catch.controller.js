myApp.controller('CatchController', ['$http', '$location', 'NgMap', '$scope', function($http, $location, NgMap, $scope){
  console.log('CatchController loaded');

  // global variable
  var vm = this;
  vm.lat = '';
  vm.lng = '';

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
     $scope.$apply();// trigger the digest cycle or will have to click to show that it's populated
   };// end showPosition

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
      date: vm.dateIn,
      location: vm.locationIn,
      latitude: vm.lat,
      longitude: vm.lng,
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
    vm.img='';
    vm.typeIn='';
    vm.sizeIn='';
    vm.weightIn='';
    vm.dateIn='';
    vm.locationIn='';
    vm.lat='';
    vm.lng='';
    vm.descriptionIn='';
    //  begin swal
    swal("New Catch Added!", "A new fish was added to your log!", "success");
  };// end addFish

   // uploading an image to filestack
   vm.uploadImg = filestack.init('AHwdt1GnnReXiWuvTKZB7z');
   vm.showPicker = function() {
     vm.uploadImg.pick({
     }).then(function(response){
       console.log('upload this img', (response.filesUploaded[0].url));
       vm.img = response.filesUploaded[0].url;
       console.log('vm.img->', vm.img);
       $scope.$apply();// trigger the digest cycle or will have to click to show that it's populated
     });
   };// end showPicker

}]);// end controller
