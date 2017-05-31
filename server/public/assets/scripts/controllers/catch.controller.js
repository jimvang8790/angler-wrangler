myApp.controller('CatchController', ['$http', '$location', function($http, $location){
  console.log('CatchController loaded');

  var vm = this;

  // add a new catch to mongoDB
  vm.addFish = function() {
    console.log('add fish button click');

    var objectToSend = {
      img: vm.imgIn,
      type: vm.typeIn,
      size: vm.sizeIn,
      weight: vm.weightIn,
      date: vm.dateIn,
      map: vm.mapIn,
      lake: vm.lakeIn,
      location: vm.locationIn,
      description: vm.descriptionIn
    };// end objectToSend
    console.log('objectToSend->', objectToSend);

    // items to send to the mongoDB
    console.log('items to send to the mongoDB');
    $http({
      method: 'POST',
      url: '/catch',
      data: objectToSend
    }).then(function(response){
      console.log('back from the server with', response);
      // vm.getFish();
    });// end $http

    // vm.imgIn='';
    // vm.typeIn='';
    // vm.sizeIn='';
    // vm.weightIn='';
    // vm.dateIn='';
    // vm.mapIn='';
    // vm.lakeIn='';
    // vm.locationIn='';
    // vm.descriptionIn='';
  };// end newCatch

}]);// end controller
