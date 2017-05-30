myApp.controller('CatchController', ['$http', '$location', function($http, $location){
  console.log('CatchController loaded');

  var vm = this;

  vm.addFish = function() {
    console.log('add fish button click');
  };// end newCatch

}]);// end controller
