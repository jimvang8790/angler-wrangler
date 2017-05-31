myApp.controller('ProfileController', ['$http', '$location', function($http, $location){
  console.log('ProfileController loaded');

  var vm = this;

  // upload a profile picture
  vm.addPicture = function() {
    console.log('upload button click');
    var pictureToSend = {
      username: vm.usernameIn,
      picture: vm.profileIn
    };// end pictureToSend
    console.log('pictureToSend->', pictureToSend);

    // picture to send to mongoDB
    console.log('picture to send to mongoDB');
    $http({
      method: 'POST',
      url: '/picture',
      data: pictureToSend
    }).then(function(response) {
      console.log('back from the server with profilePic response', response);
    });

  vm.profileIn='';

  }; // end addPicture
}]);// end controller
