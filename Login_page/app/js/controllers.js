'use strict';

/* Controllers */
var calendarcontroller = angular.module('calendarcontroller', ['ngSanitize']);

calendarcontroller.controller('idCtrl', ['$scope', '$location','$http','$rootScope',
  function($scope,$location,$http,$rootScope) {    
	//alert("inside idctrl");
	$scope.school = function()
	{	$rootScope.id=$scope.schoolid;	
		switch($scope.schoolid)
		{
		case "test":					
					$scope.url = 'sample.json';					
					break;			
							
		case "test1":					
					$scope.url = 'sample1.json';					
					break;
					
		case "test2":					
					$scope.url = 'sample2.json';					
					break;
		default:
				$scope.url = '';
		}
		
		$http({method: 'GET', url: $scope.url, header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',  
							'Accept': '*/*',
							'Content-Type': 'text/plain; charset=utf-8'}}).
			  success(function(data, status) {				
				if(data.result === 'success'){					
					document.body.style.backgroundColor=data.schoolinfo.school_color;
					$rootScope.value=data;
					//alert($rootScope.value);
					$location.path('/user_login');
				}else{	
					
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
		
	};
  }]);
  
  
  calendarcontroller.controller('loginCtrl', ['$scope', '$location','$http','$rootScope',
  function($scope,$location,$http,$rootScope) {  
			//cssInjector.add("css/calender.css");
			$scope.v=$rootScope.value;
			//alert($scope.v);
			$scope.src=$rootScope.value.schoolinfo.school_logo;
			$scope.caption=$rootScope.value.schoolinfo.school_caption;
			$scope.school=$rootScope.value.schoolinfo.school_name;
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
		//document.body.style.backgroundColor=data.schoolinfo.school_color;
		document.getElementById("myHeader");
		
		
	};
  }]);

  calendarcontroller.controller('hmCtrl', ['$scope', '$location','$http','$rootScope',
  function($scope,$location,$http,$rootScope) {  		
		
		document.body.style.backgroundColor="#FFFFFF";
		document.getElementById("head").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		document.getElementById("toggle-left").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		document.getElementById("toggle-right").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//alert(document.getElementById("head"));
		$scope.schoolname=$rootScope.value.schoolinfo.school_name;
		
	
  }]);
