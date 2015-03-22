'use strict';

angular.module('barber-book')
.controller('OauthCtrl', ['$rootScope', '$scope', '$state', '$auth', '$window', function($rootScope, $scope, $state, $auth, $window){
  $scope.name = _.capitalize($state.current.name);
 console.log('currentName', $state.current.name);
 console.log('name', $scope.name);

  function login(response){
    $window.localStorage.user = JSON.stringify(response.data.user);
    $rootScope.user = response.data.user;
    $state.go('home');
  }

  $scope.authenticate = function(provider){
    $auth.authenticate(provider)
    .then(login);
  };

  $scope.submit = function(user){
    if($scope.name === 'Register'){
      if((user.password1 === user.password2) && (user.email)){
        $auth.signup({email:user.email, password: user.password1})
        .then(login);
      }else{
        user.password1 = user.password2 = '';
      }
    }else{
      $auth.login({email:user.email, password:user.password})
      .then(login);
    }
  };
}]);
