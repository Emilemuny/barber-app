'use strict';

angular.module('barber-book')
.factory('Business',['$http', function($http){

  function register(businessId, business){
    return $http.post('/auth/register', business);
  }

  function login(business){
    return $http.post('/auth/login', business);
  }

  function logout(){
    return $http.delete('/auth/logout');
  }

  function update(businessId, business){
    return $http.put('/business/${businessId}', business);
  }

  return {register:register, login:login, logout:logout, update:update};

}]);
