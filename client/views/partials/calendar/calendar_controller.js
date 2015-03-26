'use strict';

angular.module('barber-book')
 .controller('CalCtr', ['$scope','$rootScope' , 'Business', function($scope, $rootScope,Business){

  $scope.sendAppt = function(apptData, businessId) {
    console.log('appDATA', apptData);
    console.log('UserId', $rootScope.user._id);
    console.log('BusinessId', businessId);

    let payload = {
      userId: $rootScope.user._id,
      apptDate: apptData.dateA,
      msg: apptData.txt
    };
    Business.setAppt(businessId, payload);
  };

  $(function () {
    $('.example #datetimepicker5').datetimepicker({
      //inline: true,
      //sideBySide: true,
      defaultDate: '11/1/2013',
      disabledDates: [
        moment('12/25/2013'),
        new Date(2013, 11 - 1, 21),
        '11/22/2013 00:53'
      ]
    });
  });


  $( '.example.modal form #message-text' ).click(function( event ) {
        event.stopPropagation();

      });




 }]);
