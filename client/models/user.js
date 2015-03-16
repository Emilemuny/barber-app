'use strict';

angular.module('angular-prototype')
  .factory('User', ['$rootScope', '$http', function($rootScope,$http){

    function register(userId, user){
      return $http.post(`/users/${userId}`, user);
    }
    function logout(){
      return $http.delete('/logout');
    }

    return {register:register, logout:logout};
  }]);
