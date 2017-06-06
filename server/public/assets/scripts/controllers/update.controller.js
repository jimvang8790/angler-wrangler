// myApp.controller('UpdateController', ['$http', '$location', 'NgMap', '$scope', function($http, $location, NgMap, $scope){
//   console.log('UpdateController loaded');
//
//   // global variable
//   var vm = this;
//   vm.lat = '';
//   vm.lng = '';
//
//   // NOTE Goolge Map API call
//   NgMap.getMap().then(function(map) {
//     vm.showCustomMarker= function(evt) {
//       map.customMarkers.foo.setVisible(true);
//       map.customMarkers.foo.setPosition(this.getPosition());
//     };
//     vm.closeCustomMarker= function(evt) {
//       this.style.display = 'none';
//     };// end closeCustomMarker
//   });// end getMap
//
//    //NOTE to display latitude and longitude
//    vm.getLocation = function() {
//      console.log('Getting location, please wait...');
//      if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(vm.showPosition);
//     }// end if
//     else {
//         // vm.demo.innerHTML = 'Geolocation is not supported by this browser.';
//     }// end else
//    };// end getLocation
//
//    //get items from database
//    vm.getItems = function() {
//      console.log('getting items');
//      $http({
//        method: 'GET',
//        url: '/user/getItems',
//      }).then(function(response){
//        console.log('this is the response for get items:', response.data);
//        vm.item = response.data;
//      });
//    };// end getItems
//
//    vm.getItems();// call function inorder to see logs
//
// }]);// end controller
