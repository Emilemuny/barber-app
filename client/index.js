'use strict';

angular.module('barber-book', ['ui.router', 'ngMessages', 'satellizer'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider){
    $urlRouterProvider.otherwise('/authenticate');


    $stateProvider
      .state('authenticate', {url:'/authenticate', templateUrl:'/views/general/authenticate.html', controller:'bizOauthCtrl'})
      .state('login', {url: '/login', templateUrl: '/views/general/authenticate.html', controller:'bizOauthCtrl'})
      .state('register', {url: '/register', templateUrl: '/views/general/authenticate.html', controller:'bizOauthCtrl'})

      .state('home', {url:'/home', templateUrl:'/views/general/home_user.html', controller: 'HomeCtrl'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

      .state('homebiz', {url:'/business', templateUrl:'/views/business/homebiz.html', controller: 'HomeBizCtrl'});



      $authProvider.github({clientId: '0f2f449e07affa7ca822'});
      $authProvider.facebook({clientId: '1418892481739742'});
      $authProvider.google({clientId: '163158498926-liap9036t6hqercc1jj4k679eicgnn13.apps.googleusercontent.com'});
      $authProvider.twitter({url: '/auth/twitter'});
      $authProvider.oauth2({
          name: 'instagram',
          url: 'http://localhost:3333/auth/instagram',
          redirectUri: 'http://localhost:3333',
          clientId: '84bfc810b1da4d31b678b2b528802a8d',
          requiredUrlParams: ['scope'],
          scope: ['basic'],
          scopeDelimiter: '+',
          authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
        });
  }])

  .run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth){
    if($auth.isAuthenticated()){

      if($window.localStorage.user){
        $rootScope.user = JSON.parse($window.localStorage.user);
      }
    }

    function init(){
      if($window.localStorage.business){
        $rootScope.business= JSON.parse($window.localStorage.business);
      }
    }
    
    init();

   }]);
