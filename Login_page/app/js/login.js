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
	  when('/user_login', {
        templateUrl: 'partials/user_login.html',
		
      });
       
     
	   
  }]);