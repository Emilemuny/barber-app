'use strict';

angular.module('barber-book')
.controller('bizOauthCtrl', ['$rootScope', '$scope', '$state', '$auth', '$window', 'Business', function($rootScope, $scope, $state, $auth, $window, Business) {


  $scope._ = _;
  $scope.name = $scope._.capitalize($state.current.name);
  $scope.alertMessage = '';

  function login(response){
    $window.localStorage.user = JSON.stringify(response.data.user);
    $rootScope.user = response.data.user;
    $state.go('home');
  }

  $scope.authenticate = function(provider){
    $auth.authenticate(provider)
    .then(login);
  };

  $scope.submit = function(business) {
    if ($scope.name === 'Register') {
      if ((business.password1 === business.password2) && (business.email)) {
        Business.register({email: business.email, password: business.password1}).then(function(){
          $state.go('login');
        }, function(){
          business.email = business.password1 = business.password2 = '';
        });
      } else {
        $scope.alertMessage = 'Please check the provided information';
        business.password1 = business.password2 = '';
      }
    } else {
      Business.login(business).then(function(response) {
        $scope.alertMessage = '';
        $rootScope.name = response.data.name;
        $window.localStorage.business = JSON.stringify(response.data.business)
        $rootScope.business = response.data.business;
        $state.go('home');
      }, function() {
        $scope.alertMessage = 'Incorrect email/password';
        business.email = business.password1 = business.password2 = business.password = '';
      });
    }
  };
}]);
