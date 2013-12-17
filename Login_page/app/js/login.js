'use strict';

var CalenderApp = angular.module('CalenderApp', [
  'ngRoute'
]);

CalenderApp.config(['$routeProvider',
  function($routeProvider ) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
		
      }).
	  when('/User_login', {
        templateUrl: 'partials/User_login.html',
		
      });
       
     
	   
  }]);