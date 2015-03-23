'use strict';

angular.module('barber-book')
  .factory('Business',['$http', function($http){

      function register(business){
        return $http.post(`/register`, business);
      }

      function login(business){
         return $http.post('/login', business);
      }

      function logout(){
        return $http.delete('/auth/logout');
      }

      function update(businessId, business){
        return $http.put(`/business/${businessId}`, business);
      }

      return {register:register, login:login, logout:logout, update:update};

}]);
