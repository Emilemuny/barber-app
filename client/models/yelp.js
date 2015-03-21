'use strict';

angular.module('barber-book')
  .factory('Yelp', ['$http', function($http){

    function review(business, location){
      return $http.get('/yelp?business=' + business + '&location=' + location);
    }

    return {review:review};
  }]);
