//'use strict';

/* Controllers */
var calendarcontroller = angular.module('calendarcontroller', ['ngSanitize']);

/*calendarcontroller.controller('idCtrl', ['$scope', '$location','$http','$rootScope',
  function($scope,$location,$http,$rootScope) {   
	$scope.school = function()
	{	$rootScope.id=$scope.schoolid;  
	//alert("inside idctrl");
				
		$scope.method = 'GET';		
		$http({method: $scope.method, url: 'http://schoolmanagementsoftwares.in/api/CustomApi?schoolid='+$scope.schoolid,header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',          */
	//						'Accept': '*/*',
		/*					'Content-Type': 'text/plain; charset=utf-8'}}).
			  success(function(data, status) {
				if(data.result === true){
					$rootScope.value=data;
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
	};
  }]);
  */
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
			$scope.src=$rootScope.value.Logo;
			$scope.caption=$rootScope.value.Slogan;
			$scope.school=$rootScope.value.SchoolName;
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
		//document.getElementById("head").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//document.getElementById("toggle-left").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//document.getElementById("toggle-right").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//document.getElementById("left-drawer").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//document.getElementById("right-drawer").style.backgroundColor=$rootScope.value.schoolinfo.school_color;
		//alert($rootScope.value.SchoolName);
		
			$scope.school=$rootScope.value.SchoolName;
		//dhx.ready() function ensures that your code will be executed as soon as the page finishes loading
				dhx.ready(function(){
					//the method allows you to hide the address bar on iPhone/iPod to save the space for application
					dhx.ui.fullScreen();
					//object constructor
					dhx.ui({
						view: "scheduler",
					id: "scheduler"
					});
					// method load() lets you to populate the scheduler with data
					$$("scheduler").load("../common/mobile.xml","scheduler");
				});
			
  }]);

  
  //Scheduler control
  
  //app.js
 calendarcontroller.controller('MainSchedulerCtrl', function($scope) {
				
});

//app.scheduler.js

