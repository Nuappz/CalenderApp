//'use strict';

var CalendarApp = angular.module('CalendarApp', [
  'ngRoute','ui.bootstrap','phonecatServices',
  'calendarcontroller'
]);

CalendarApp.config(['$routeProvider',
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
        templateUrl: 'partials/home_page.html',
		controller:'hmCtrl'
		
      }).
      when('/sms', {
        templateUrl: 'partials/sms.html'		
      }).
	  when('/news', {
        templateUrl: 'partials/news.html'		
      }).
	  when('/event', {
        templateUrl: 'partials/event.html'		
      }).
	  when('/settings', {
        templateUrl: 'partials/settings.html'		
      });
	   
  }]);
  
  