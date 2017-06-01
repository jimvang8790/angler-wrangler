// adding custom markers to google map
// angular.module('myapp', ['ngMap']);
  myApp.controller('MyCtrl', function(NgMap){
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
  //  vm.x = document.getElementById('demo');

   vm.getLocation = function() {
     console.log('get location button click:');
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(vm.showPosition);
    }// end if
    else {
        vm.demo.innerHTML = 'Geolocation is not supported by this browser.';
    }// end else
   };// end getLocation

   vm.showPosition = function(position) {
     console.log('position', position);
     
   };// end showPosition

 });// end controller
