// adding custom markers to google map
  myApp.controller('MyCtrl', ['$http', '$location', 'NgMap', function($http, $location, NgMap){

    var vm = this;
    // vm.demo='';

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
  //  vm.x = document.getElementById('demo');

   vm.getLocation = function() {
     console.log('Getting location, please wait. Loading...:');
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(vm.showPosition);
    }// end if
    else {
        // vm.demo.innerHTML = 'Geolocation is not supported by this browser.';
    }// end else
   };// end getLocation

   vm.showPosition = function(position) {
     console.log('geolocation', position);
     vm.lat = position.coords.latitude;
     vm.lng = position.coords.longitude;
     console.log('vm.lat', vm.lat);
     console.log('vm.lng', vm.lng);
   };// end showPosition

 }]);// end controller