/* jshint camelcase: false */

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

      function findbiz(business){
        return $http.get('/getbusiness', business);
      }

      function setAppt(businessId, ApptData){
        return $http.post(`/booking/${businessId}`, ApptData);
      }

      function getAppt(businessId, appt){
        return $http.get(`/business/${businessId}/listappt`, appt);
      }

      function getdetails(place_id){
        console.log('placeid',place_id);
        return $http.get(`/business/getdetails/${place_id}`);
      }

      return {register:register, login:login, logout:logout, confirmPIN:confirmPIN, update:update, findbiz:findbiz, setAppt:setAppt, getAppt:getAppt, getdetails:getdetails};

}]);
