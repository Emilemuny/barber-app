'use strict';

angular.module('barber-book')
  .controller('MoreCtrl', ['$scope', '$rootScope', 'Yelp', function($scope, $rootScope, Yelp){



  //  angular.element('[ng-app]').injector().get('Yelp').review(business.name, business.address);
  console.log('reviewsData', Yelp.review('Genes Barber Shop', 'fremonte'));




  }]);
