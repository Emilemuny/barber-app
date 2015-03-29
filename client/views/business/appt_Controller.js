'use strict';

angular.module('barber-book')
  .controller('listapptCtrl', ['$scope', '$state', '$rootScope','Business',  function($scope, $state, $rootScope, Business){

  Business.getAppt($rootScope.business._id).then(function(response){
     console.log('response', response.data.appt);
    $scope.bizappts = response.data.appt;
    
  });

  }]);
