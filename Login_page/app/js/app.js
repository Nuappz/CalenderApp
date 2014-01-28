'use strict';

var CalenderApp = angular.module('CalenderApp', [
  'ngRoute',
  'calendarcontroller'
]);

CalenderApp.config(['$routeProvider',
  function($routeProvider ) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
		controller:'idCtrl'		
      }).
	  when('/user_login', {
        templateUrl: 'partials/user_login.html',
		controller:'loginCtrl'
		
      }).
	  when('/home_page', {
        templateUrl: 'partials/home_page.html'
		
      });
       
     
	   
  }]);