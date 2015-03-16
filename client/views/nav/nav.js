'use strict';

angular.module('angular-prototype')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', '$window', function($rootScope, $scope, $state, $window){
    $scope.logout = function(){
     delete $rootScope.user;
     $window.localStorage.clear();
     $state.go('home');
    };
  }]);
