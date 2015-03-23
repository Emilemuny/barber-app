'use strict';

angular.module('barber-book')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', '$window', function($rootScope, $scope, $state, $window){
    $scope.logout = function(){
     delete $rootScope.user;
  //   delete $rootScope.business;
     $window.localStorage.clear();
     $state.go('/');
    };
  }]);
