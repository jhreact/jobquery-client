app.controller('LoginCtrl', ['User', '$state', '$scope', 'localStorageService', function( User, $state, $scope, localStorageService) {

  $scope.submit =  function(email, password){

    User.login({email : email, password : password})
      .then( function(response) {
        localStorageService.set('token', response.data.token);
        localStorageService.set('token-date', JSON.stringify(new Date()));
        localStorageService.set('_id', response.data._id);
        localStorageService.set('isAdmin', response.data.isAdmin);

        // got to appropiate part of the app
        if(response.data.isAdmin){
          // go to default admin route
          $state.go('admin.dashboard', { _id : response.data._id});
        } else {
          // got to default user route
          $state.go('users.account', { _id : response.data._id});
        }
      }, function(error) {
        $scope.invalid = true;
      });
  };

}]);
