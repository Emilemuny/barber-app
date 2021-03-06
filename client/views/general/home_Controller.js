/* jshint camelcase: false */

'use strict';

angular.module('barber-book')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$http', 'Business', function($rootScope, $scope, $state, $http, Business){


var map;
var infoWindow;
var service;

 Business.findbiz().then(function(response){
   $scope.businesses = response.data.businesses;
 });

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
    alert(status);
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
        alert(status);
        return;
      }
      var LoCation = result.address_components[2].long_name;

    angular.element('[ng-app]').injector().get('Yelp').review(result.name, LoCation);

     $scope.result = result;
    //  $scope.reviews = result.reviews;
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}

$scope.moreinfo = function(business) {
   let place_id = business.place_id;
   Business.getdetails(place_id).then(function(response){

     $scope.reviews = response.data.result.reviews;
     $scope.openinghrs = response.data.result.opening_hours;
     $scope.rating = response.data.result.rating;

   }).state('moreinfo');
};

 initialize();
//google.maps.event.addDomListener(window, 'load', initialize);

}]);
