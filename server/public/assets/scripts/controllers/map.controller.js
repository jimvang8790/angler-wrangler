// adding custom markers to google map
  myApp.controller('MapController', ['$http', '$location', 'NgMap', '$scope', function($http, $location, NgMap, $scope){

    var vm = this;

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

 }]);// end controller
