angular.module('myapp', ['ngMap']);
     angular.module('myapp').controller('MyCtrl', function(NgMap){
       var vm = this;
       NgMap.getMap().then(function(map) {
         vm.showCustomMarker= function(evt) {
           map.customMarkers.foo.setVisible(true);
           map.customMarkers.foo.setPosition(this.getPosition());
         };
         vm.closeCustomMarker= function(evt) {
           this.style.display = 'none';
         };
       });
     });
