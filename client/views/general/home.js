'use strict';

var map;
var service;
var infowindow;

function initialize(){

  var fremont = new google.maps.LatLng(37.5483333, -121.9875);

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: fremont,
    zoom: 15

  });

  var request = {
    location: fremont,
    radius: '500',
    types: ['store']
  };

  service= new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if(status === google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i++){
      var place = results[i];

      createMarker(results[i]);
    }
    console.log('Results', results[0]);
  }
}



function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
