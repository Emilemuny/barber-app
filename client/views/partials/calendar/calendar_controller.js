'use strict';

angular.module('barber-book')
 .controller('CalCtr', ['$scope', function($scope){

  $scope.sendAppt = function(apptData) {
    console.log('apptData', $scope.sendAppt );
    console.log('appDATA', apptData);
  };


  $(function () {
    $('#datetimepicker5').datetimepicker({
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

  $('#exampleModal').on('hide.bs.modal', function(e){
    if(isBlocked) return e.preventDefault();
  });



 }]);
