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

      function confirmPIN(businessId, phone){
        return $http.post(`/business/${businessId}/message`, phone);
      }

      function update(businessId, business){
        return $http.post(`/business/${businessId}/update`, business);
      }

      return {register:register, login:login, logout:logout, confirmPIN:confirmPIN, update:update};

}]);
