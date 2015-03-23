'use strict';

angular.module('barber-book')
.controller('OauthCtrl', ['$rootScope', '$scope', '$state', '$auth', '$window', function($rootScope, $scope, $state, $auth, $window){
  $scope.name = _.capitalize($state.current.name);
 console.log('currentName', $state.current.name);
 console.log('name', $scope.name);

  function login(response){
    $window.localStorage.business = JSON.stringify(response.data.user);
    $rootScope.user = response.data.user;
    $state.go('home');
  }

  $scope.authenticate = function(provider){
    $auth.authenticate(provider)
    .then(login);
  };

  $scope.submit = function(business){
      if($scope.name === 'Register'){
        if((business.password1 === business.password2) && (business.email)){
          $auth.register({email:business.email, password:business.password1})
          .then(login);
        }else{
          business.password1 = business.password2 = '';
        }
      }else{
        $auth.login({email:business.email, password:business.password})
        .then(login);
      }
    };
}]);
