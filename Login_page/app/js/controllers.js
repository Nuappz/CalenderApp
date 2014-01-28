'use strict';

/* Controllers */
var calendarcontroller = angular.module('calendarcontroller', ["ngSanitize"]);

calendarcontroller.controller('idCtrl', ['$scope', '$location','$http',
  function($scope,$location,$http) {    
	$scope.school = function()
	{			
	/*			
		$scope.method = 'GET';
		$scope.url = 'check.json';
		$http({method: $scope.method, url: $scope.url,params: {schoolid:$scope.schoolid},header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
	*///						'Accept': '*/*',
		/*					'Content-Type': 'text/plain; charset=utf-8'}}).
			  success(function(data, status) {
				if(data === 'success'){					
					$location.path('/user_login');
				}else{					
					//$scope.alertmsg='Enter correct school id';
					$scope.test="Invalid school id";
					$scope.schoolid = '';					
					$location.path('/');			
				}
			  }).
			  error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
				$location.path('/');
			});
		*/
		
		if($scope.schoolid === "test"){
			$location.path('/user_login');					
			
		}else{
			$scope.schoolid = '';
			$location.path('/');
		}
		
		
	};
  }]);
  
  
  calendarcontroller.controller('loginCtrl', ['$scope', '$location','$http',
  function($scope,$location,$http) {  
			
	$scope.login = function()
	{	
		/*
			$scope.method = 'GET';
			$scope.url = 'check.json';
			$http({method: $scope.method, url: $scope.url,params: {userid:$scope.userid,password:$scope.password},header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
		*/ //						'Accept': '*/*',
		/*						'Content-Type': 'text/plain; charset=utf-8'}}).
				  success(function(data, status) {
					if(data === 'success'){					
						$location.path('/home_page');
					}else{
						$scope.alertmsg='Invalid Username or password';
						$scope.userid = '';
						$scope.password = '';
						$location.path('/user_login');			
					}
				  }).
				  error(function(data, status) {
					$scope.data = data || "Request failed";
					$scope.status = status;
					$location.path('/user_login');
					});
		*/
		
		if($scope.userid === "test" && $scope.password === "test"){			
			$location.path('/home_page');
			
		}else{
			$scope.alertmsg='Invalid Username or password';
			$scope.userid = '';
			$scope.password = '';
			$location.path('/user_login');
		}
		
	};
  }]);
  
 

