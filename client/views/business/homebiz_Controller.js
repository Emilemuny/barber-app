/* jshint camelcase: false */

'use strict';

angular.module('barber-book')
  .controller('HomeBizCtrl', ['$rootScope', '$scope', '$state', 'Business', function($rootScope, $scope, $state, Business){


    $scope.pinconf = function(response) {
      console.log('IN PINCONF');
      var phoneN = '+18572668102';
      Business.confirmPIN($rootScope.business._id , {phone: phoneN});
      console.log('RESPONSE', response);
    };

    $scope.update = function(){
      let payload = {                         //add the if PIN is correct before updating
        name: $scope.result.name,
        address: $scope.result.formatted_address,
        phone: $scope.result.formatted_phone_number,
        yelpId: $scope.result.id
      };
      Business.update($rootScope.business._id, payload);
    };

var map;
var infoWindow;
var service;

function initialize() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success);
  }

  function success(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    console.log('Lati', lat);
    console.log('Lati', long);


  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: coords,
    zoom: 12,
    styles: [
      {
        stylers: [
          { visibility: 'simplified' }
        ]
      },
      {
        elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      }
    ]
  });


  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}
}
function performSearch() {
  var request = {
    bounds: map.getBounds(),
    radius: '500',
    keyword: 'barbershop'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    alert('alert1', status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    createMarker(result);
  }
}

function createMarker(place) {
  var barberIcon = 'http://www.myiconfinder.com/uploads/iconsets/';
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,

    icon: barberIcon + '20-20-273d641035982cf25faff0bb3cd5eb29-hairdresser.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        alert('alert2', status);
        return;
      }
      console.log('Result Location**',result.address_components[2].long_name);
      var LoCation = result.address_components[2].long_name;

    angular.element('[ng-app]').injector().get('Yelp').review(result.name, LoCation);
  //  console.log('Result LONGNAME', result.address_components);

     //adding result name in the scope for now..
     $scope.result = result;

    console.log('Result Biz Name**',result);
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

}]);
