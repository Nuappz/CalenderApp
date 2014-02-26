	//'use strict';

	/* Controllers */
	var calendarcontroller = angular.module('calendarcontroller', ['webStorageModule','ui.bootstrap']);

	calendarcontroller.controller('idCtrl', ['$scope', '$location','$http','$rootScope','webStorage',
	function($scope,$location,$http,$rootScope,webStorage) {		
		$rootScope.default_color='#172221'; 
		$rootScope.secret_key='!@$SVP$@!';
		$rootScope.n_cntr=5;
		$rootScope.cntr=6;
		$scope.school = function()		
		{	
			$scope.school_data=webStorage.memory.get("schoolid");
			if($scope.school_data){				
					console.log("available");	
					$scope.schoolid=$scope.school_data;
					//$scope.school();				
				}
			if($scope.school_checkbox){				
				webStorage.memory.add("schoolid",$scope.schoolid);
				$scope.data=webStorage.memory.get("schoolid");	
				console.log(webStorage.memory.get("schoolid"));				
			}
			else{
				console.log("!checked");
				webStorage.memory.remove("schoolid");				
			}
			
			$rootScope.logout=false;
			$scope.method = 'GET';	
			$scope.url = 'http://schoolmanagementsoftwares.in/api/CustomApi?';
			$http({method: $scope.method, url:$scope.url ,params: {X:$scope.schoolid, a:$rootScope.secret_key},header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',          
				'Accept': '*/*',
				'Content-Type': 'text/plain; charset=utf-8'}})
				.success(function(school_data, status) {
					if(school_data.result === true){
						$rootScope.value=school_data;					
						$rootScope.colr='#'+$rootScope.value.BgColor;					
						//alert($rootScope.colr);
						document.body.style.backgroundColor=$rootScope.colr;
						$location.path('/user_login');
						$rootScope.sid=$scope.schoolid;
					}
					else{										
						$scope.test="Invalid school id";
						$scope.schoolid = '';					
						$location.path('/');			
					}
				})
				.error(function(school_data, status) {
					alert("Request Failed");
					$scope.schoolid = '';
					$location.path('/');
				});	
		};		
	}]);


	calendarcontroller.controller('loginCtrl', ['$scope', '$location','$http','$rootScope','webStorage',
	function($scope,$location,$http,$rootScope,webStorage) { 			
		$scope.src=$rootScope.value.Logo;
		$scope.caption=$rootScope.value.Slogan;
		$scope.school=$rootScope.value.SchoolName;

		$scope.login = function(){		
			if($scope.user_checkbox){
				webStorage.memory.add("userid",$scope.userid);
				webStorage.memory.add("pwd",$scope.password);
				webStorage.memory.get("userid");
				webStorage.memory.get("pwd");
			}
			$scope.method = 'GET';
			$scope.url = 'http://schoolmanagementsoftwares.in/api/CustomApi?';
			$http({method: $scope.method, url: $scope.url,params: {  X:$rootScope.sid,userid:$scope.userid,password:$scope.password,a:$rootScope.secret_key},header:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
				'Accept': '*/*',
				'Content-Type': 'text/plain; charset=utf-8'}})
				.success(function(user_data, status) {				
					if(user_data.result === true){					
						$location.path('/home_page');
						$rootScope.r=user_data.r;
						$rootScope.y=user_data.y;
						$rootScope.z=user_data.z;		
						
					}else{				
						$scope.alertmsg=user_data.Message;
						$scope.userid = '';
						$scope.password = '';
						$location.path('/user_login');			
					}
				})
				.error(function(user_data, status) {
					alert("Request Failed");
					$location.path('/user_login');
				});
		};
		$scope.go_to_School_ID = function(){	
			$rootScope.value='';					
			$rootScope.colr='';					
			//alert($rootScope.colr);
			document.body.style.backgroundColor=$rootScope.default_color;
			$rootScope.sid='';
			$location.path('/');
			
		};
	}]);

	calendarcontroller.controller('hmCtrl', ['$scope', '$location','$http','$rootScope','$modal',
	function($scope,$location,$http,$rootScope,$modal) {  
		$scope.template='partials/calendar.html';
		
		document.body.style.backgroundColor="#FFFFFF";		
		document.getElementById("head").style.backgroundColor=$rootScope.colr;
		document.getElementById("toggle-left").style.backgroundColor=$rootScope.colr;
		document.getElementById("toggle-right").style.backgroundColor=$rootScope.colr;
		document.getElementById("left-drawer").style.backgroundColor=$rootScope.colr;
		document.getElementById("right-drawer").style.backgroundColor=$rootScope.colr;
		$scope.school=$rootScope.value.SchoolName;

		//SMS,news,notes,settings
		$rootScope.calendar=function(){	
			alert("calendar");
			$scope.template='partials/calendar.html';		
		};
		$scope.gotosms=function(){			
			$scope.template='partials/sms.html';			
		};
		$scope.gotonews=function(){	
			$scope.template='partials/news.html';
			var news_modalInstance = $modal.open({
				templateUrl: 'partials/news_modal.html',
				controller: 'newsModalCtrl'	  
			});
			news_modalInstance.result.then(function () {		  
			  
			}, function () {
			
			});	
			
		};		
			
		$scope.gotoannouncement=function(){		
			
			var announcement_modalInstance = $modal.open({
			  templateUrl: 'partials/announcement_modal.html',
			  controller: 'AnnouncementModalCtrl'	  
			});
			announcement_modalInstance.result.then(function () {		  
			  
			}, function () {	
				
			});		
			
			$scope.template='partials/announcement.html';
		};
		
		$scope.gotonotes=function(){			
			$scope.template='partials/note.html';			
		};
		
		$scope.logout=function(){
					$rootScope.logout=true;
					$scope.userid = '';
					$scope.password = '';
					$location.path('/user_login');
					document.body.style.backgroundColor=$rootScope.colr;
		};
	}]);



	calendarcontroller.controller('newsCtrl', ['$scope', '$location','$http','$rootScope',
	function($scope,$location,$http,$rootScope) {			 
			//alert("newsctrl");
			$scope.lastid='';		
			$rootScope.len='';			
			$rootScope.n_cntr=0;
			$scope.nws_val='all_news'
			$scope.method = 'GET';
			$scope.url = 'http://schoolmanagementsoftwares.in/api/NewsApi/Get?';
			$http({method: $scope.method, url:$scope.url ,params: { X:$rootScope.sid,Y:$rootScope.y,Z:$rootScope.z,a:$rootScope.secret_key}})
				.success(function(data, status, headers) 																				
				{ 
					//alert("success");
					var L = data.length;									
					for (var i = 0; i < L; i++) {
						var obj = data[i];
						for (var j in obj) {
							if(data[i].PostedOn)
							{	
								data[i].PostedOn=data[i].PostedOn.replace("T"," ");										
								//console.log(data[i].start_date);
							}						
						}
					}
					var last=L-1;
					$scope.checkid=$scope.lastid;
					$scope.lastid=data[last].AnnouncementId;
						if( $scope.checkid != $scope.lastid )
						{	
							var counter=0;
							for (var i = $scope.checkid; i < L; i++) {					
								++counter;
							}														
						}
					counter=5;
					$rootScope.n_cntr=counter;
					$scope.view_news= data;	
					var Len = data.length;
					var L=Len;		
					var temp_data=[];
					//console.log($scope.temp_data);							
					var j=0;
					for (var i = L-1; i > Len-4; i--) {
						temp_data[j]=data[i];
						console.log(data[i]);
						console.log(temp_data);
						j++;							
					}			
					$rootScope.$broadcast('handlenewsBroadcast',temp_data);
									
				})
				.error(function(data, status, headers) {				
					alert("Request Failed");				
				});	
			
			$rootScope.select_news=function(news_id){		
				$scope.nws_val='one_news';			
				console.log(news_id);			
				$scope.Title=news_id.Title;			
				$scope.SenderName=news_id.SenderName;
				$scope.News=news_id.News;
				$scope.PostedOn=news_id.PostedOn;			
			};	
		
	}]);

	calendarcontroller.controller('newsModalCtrl', ['$scope','$modalInstance', '$location','$http','$rootScope',
	function ($scope, $modalInstance, $rootScope) {  
		$scope.$on('handlenewsBroadcast', function(value,args) { 
			$scope.popup_news=args;
		});

		$scope.more_news = function () {  
			$modalInstance.dismiss('cancel');
		}; 
		$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	  };
	}]);
	
	calendarcontroller.controller('announcementCtrl', ['$scope', '$location','$http','$rootScope','$interval','webStorage',
	function($scope,$location,$http,$rootScope,$interval,webStorage) { 			
			//$scope.existing_announcement();
			$scope.existing_announcement= function() {
			//alert("existing _announcement"); 
			$scope.shw_val='all_anncmnt';
			};
			$scope.child_ctrl= function() {
			alert("child ctrl"); 
			};
			
			//$interval($scope.existing_announcement(), 3);
		
		$scope.save_announcement = function() { 	//parameters are: x,y,z,a,dt,Subject,Message,flag,code,AType																																			
			$http({method: 'POST', url: 'http://schoolmanagementsoftwares.in/api/AnnouncementApi/Post?',params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, dt:$scope.ancmt_postedon, Subject:$scope.ancmt_subject, Message:$scope.ancmt_message, flag:'P', code:'0',AType:'A'}})
				.success(function(data, status, headers, config) 																				
				{ 
					$scope.data = data;				
					$scope.status = status;	

				})
				.error(function(data, status, headers, config) {
					alert("Request Failed");
					});					
			};
		
			$scope.shw_val='all_anncmnt';
			$scope.lastid='';
			$rootScope.get_anncmnt='';
			$rootScope.len='';	
			$rootScope.cntr=0;			
				$scope.method = 'GET';
				$scope.url = 'http://schoolmanagementsoftwares.in/api/AnnouncementApi/Get?';
				$http({method: $scope.method, url:$scope.url ,params: { X:$rootScope.sid,Y:$rootScope.y,Z:$rootScope.z,a:$rootScope.secret_key}})
					.success(function(data, status, headers) 																				
					{ 
						$rootScope.get_anncmnt=data;
						$rootScope.len=data.length;				
						var L = data.length;						
						for (var i = 0; i < L; i++) {
							var obj = data[i];
							for (var j in obj) {
								if(data[i].PostedOn)
								{	
									data[i].PostedOn=data[i].PostedOn.replace("T"," ");										
									
								}						
							}
						}
						$scope.announcement_ticker=webStorage.memory.get("anncmnt_ticker");
						if($scope.announcement_ticker)
						{
						console.log($scope.announcement_ticker);
						$scope.checkid=$scope.announcement_ticker;
						console.log($scope.checkid);
						}
						var last=L-1;
						//$scope.checkid=$scope.lastid;
						$scope.lastid=data[last].AnnouncementId;
							if( $scope.checkid != $scope.lastid )
							{	var counter=0;
								for (var i = $scope.checkid; i < L; i++) {					
									++counter;
								}
							}			
							counter=6;
							$rootScope.cntr=counter;
							webStorage.memory.add("anncmnt_ticker",$scope.lastid);
								var Len = data.length;
								var L=Len;		
								var temp_data=[];
								//console.log($scope.temp_data);							
								var j=0;
								for (var i = L-1; i > Len-4; i--) {
								temp_data[j]=data[i];								
								j++;							
								}								
							   $rootScope.$broadcast('handleBroadcast',temp_data);
							
							
							
						
						$scope.view_ancemnt= data;				
					})
					.error(function(data, status, headers) {
						console.log(data);
						alert("Request Failed");
						console.log(status);
					});		
						
			$rootScope.select=function(announcement_id){
				$scope.shw_val='one_anncmnt';							
				$scope.Subject=announcement_id.Subject;
				$scope.AnnouncementBy=announcement_id.AnnouncementBy;
				$scope.SenderName=announcement_id.SenderName;
				$scope.Message=announcement_id.Message;
				$scope.PostedOn=announcement_id.PostedOn;	
			};
			
			
	}]);

	
	calendarcontroller.controller('AnnouncementModalCtrl', ['$scope','$modalInstance', '$location','$http','$rootScope',
	function ($scope, $modalInstance, $rootScope) {
		
		$scope.$on('handleBroadcast', function(value,args) {   
			$rootScope.popup_data=args;		
		});
		$scope.popup_ancemnt=$rootScope.popup_data;
	//alert("child ctrl");
	   $scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	  };
		$scope.more_announcement = function () { 
			$modalInstance.dismiss('cancel');
		};
		
	}]);

	calendarcontroller.controller('noteCtrl', ['$scope', '$location','$http','$rootScope',
	function($scope,$location,$http,$rootScope) {  
		$scope.existing_note = function() {	
			$scope.note_val='drft_note';
			$rootScope.sms_flag='I';		
			$http({method: 'GET', url: 'http://schoolmanagementsoftwares.in/api/NoteApi?',params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z,status:'D', a:$rootScope.secret_key}})
				.success(function(data, status, headers, config) 																				
				{ 		
					var L = data.length;				
					for (var i = 0; i < L; i++) {
						var obj = data[i];
						for (var j in obj) {
							if(data[i].PostedOn)
							{	
								data[i].PostedOn=data[i].PostedOn.replace("T"," ");										
								//console.log(data[i].start_date);
							}						
						}
					}
					$scope.received_notes = data;				
					//$scope.status = status;				
				})
				.error(function(data, status, headers, config) {
					alert("Request Failed");
					console.log(status);
				});
		};
		$scope.new_note= function() { 
			$scope.note_val='n_note';			 
		};	
		$scope.save_note = function() { 	//parameters are: x,y,z,a, Code, Title,Description,FileName,VToStud,SavePublishStatus																																			
		$http({method: 'POST', url: 'http://schoolmanagementsoftwares.in/api/NoteApi?',params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z,a:'!$SVP$!',Code:'6', Title:$scope.note.title, Description:$scope.note.description, FileName:'sample',VToStud:true, SavePublishStatus:'P'}})
			.success(function(data, status, headers, config) 																				
			{ 
				$scope.data = data;	
				$scope.existing_note();
			})
			.error(function(data, status, headers, config) {
				alert("Request Failed");
			});					
		};	
	}]);

	calendarcontroller.controller('smsCtrl', ['$scope', '$location','$http','$rootScope',
	function($scope,$location,$http,$rootScope) {  	
		//$scope.val='cmps';
		$scope.compose = function() { 
			$scope.val='cmps';			 
		};	
		$scope.send_new = function() { 			
		$http({method: 'POST', url: 'http://schoolmanagementsoftwares.in/api/SMSApi?',params: { X:$rootScope.sid,Y:$rootScope.y,Z:$rootScope.z,a:'!$SVP$!',Subject:$scope.subject, Message:$scope.sms_content, flag:'R', rid:'0'}})
			.success(function(data, status, headers, config) 																				
			{ 				
			$scope.inbox();
			})
			.error(function(data, status, headers, config) {
				alert("Request Failed");
			});					
		};
		$scope.inbox = function() {	
			$scope.val='inb';
			$rootScope.sms_flag='I';		
			$http({method: 'GET', url: 'http://schoolmanagementsoftwares.in/api/SMSApi/Get?',params: { X:$rootScope.sid, Y:$rootScope.y,a:$rootScope.secret_key, Z:$rootScope.z, flag:$rootScope.sms_flag}})
				.success(function(data, status, headers, config) 																				
				{ 
					console.log(data);
					var L = data.length;									
					for (var i = 0; i < L; i++) {
						var obj = data[i];
						for (var j in obj) {
							if(data[i].SendDate)
							{	
								data[i].SendDate=data[i].SendDate.replace("T"," ");										
								//console.log(data[i].start_date);
							}						
						}
					}	
					$scope.received_sms = data;					
				})
				.error(function(data, status, headers, config) {
					alert("Request Failed");					
				});
		};
		$scope.sent = function() {
			$scope.val='s_i';
			$rootScope.sms_flag='S';
			$http({method: 'GET', url: 'http://schoolmanagementsoftwares.in/api/SMSApi/Get?',params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, a:$rootScope.secret_key, flag:$rootScope.sms_flag}})
				.success(function(si_data, status, headers) 																				
				{ 	
					var L = si_data.length;									
					for (var i = 0; i < L; i++) {
						var obj = si_data[i];
						for (var j in obj) {
							if(si_data[i].SendDate)
							{	
								si_data[i].SendDate = si_data[i].SendDate.replace("T"," ");	
							}						
						}
					}
					console.log(si_data);
					$scope.sent_sms = si_data;				
				})
				.error(function(data, status, headers) {
					console.log(data);
					alert("Request Failed");
					console.log(status);
				});					
		};	 
	}]);


	calendarcontroller.controller('clndrCtrl', ['$scope', '$location','$http','$rootScope',
	function($scope,$location,$http,$rootScope) {  	
		//load Scheduler
		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.config.init_date = new Date();	
		/*scheduler.config.selected_toolbar = [
		{view:'button', inputWidth:scheduler.xy.icon_back, id:"back", align:"left",  label:scheduler.locale.labels.icon_back, css:"cancel"},					
		{view:'button', inputWidth:90, width:100,    id:"change_time",     align:"left",  label:"change time", click:"showLocation"},
		{view:'button', inputWidth:90, width:100,    id:"change_date", align:"right", label:"change_date", click:"showLocation"}

		];	*/
		dhx.ready(function(){
			dhx.ui.fullScreen();				
			dhx.ui({
				view: "scheduler",
				id: "scheduler",
				container: "schedulerDiv"
			});
			$$("scheduler").$$("buttons").setValue("month");

			//populate scheduler
			$scope.method = 'GET';
			$scope.url = 'http://schoolmanagementsoftwares.in/api/CalendarApi?';
			$http({method: $scope.method, url: $scope.url, params: {X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, a:$rootScope.secret_key}})
				.success(function(data, status) {
					var L = data.length;
					var time;
					for (var i = 0; i < L; i++) {
						var obj = data[i];
						for (var j in obj) {
							if(data[i].StartDate)
							{	
								time=data[i].StartDate.replace("T"," ");										
								data[i].start_date = time;
								delete data.StartDate;								
								//console.log(data[i].start_date);
							}
							if(data[i].EndDate)
							{
								time=data[i].EndDate.replace("T"," ");
								data[i].end_date = time;
								delete data[i].EndDate;
								//console.log(data[i].end_date);
							}
							if(data[i].title)
							{
								data[i].text = data[i].title;
								delete data[i].title;
								//console.log(data[i].text);
							}
						}
					}
					$rootScope.calendar_value=data;	
					$$("scheduler").parse(data);
					$$("scheduler").refresh("scheduler");								
				})
				. error(function(data, status) {
					alert("Request Failed");
					$scope.status = status;
				});	

			//insert event				
			$$("scheduler").data.attachEvent("onAfterAdd",function(c_id){
				console.log(c_id);
				
				//start date
				$scope.s_date=this.item(c_id).start_date.getDate();
				$scope.s_year=this.item(c_id).start_date.getFullYear();
				$scope.s_month=this.item(c_id).start_date.getMonth() + 1;
				$scope.start_date = $scope.s_year + "-" + $scope.s_month + "-" + $scope.s_date;

				//start time
				$scope.s_hour=this.item(c_id).start_date.getHours();
				$scope.s_minute=this.item(c_id).start_date.getMinutes();
				$scope.s_seconds=this.item(c_id).start_date.getSeconds();					
				$scope.start_time = $scope.s_hour + ":" + $scope.s_minute + ":" + $scope.s_seconds;

				//end date
				$scope.e_date=this.item(c_id).end_date.getDate();
				$scope.e_year=this.item(c_id).end_date.getFullYear();
				$scope.e_month=this.item(c_id).end_date.getMonth() + 1;
				$scope.endDate = $scope.e_year + "-" + $scope.e_month + "-" + $scope.e_date;

				//end time
				$scope.e_hour=this.item(c_id).end_date.getHours();
				$scope.e_minute=this.item(c_id).end_date.getMinutes();
				$scope.e_seconds=this.item(c_id).end_date.getSeconds();
				$scope.end_time = $scope.e_hour + ":" + $scope.e_minute + ":" + $scope.e_seconds;

				//text
				$scope.text=this.item(c_id).text;			


				$scope.method = 'GET';
				$scope.url = 'http://schoolmanagementsoftwares.in/api/CalendarApi?';
				$http({method: $scope.method, url: $scope.url, params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, a:$rootScope.secret_key, StartDate:$scope.start_date, EndDate:$scope.endDate, StartTime:$scope.start_time, EndTime:$scope.end_time, title:$scope.text}})
					.success(function(c_data, status) {							
						console.log(c_data);
						/*change id*/
						$$("scheduler").data.changeId(c_id,c_data.id);
						$$("scheduler").refresh();
						console.log(c_id);
					})
					.error(function(c_data, status) {
						alert("Request Failed");
						$scope.status = status;
					});
					return true;
			});


			$$("scheduler").data.attachEvent("onStoreUpdated",function(c_id,item,operation){

				if(operation == "update"){
					this.item(c_id).id
					console.log(this.item(c_id).id);
					$scope.e=this.item(c_id).id;
					console.log($scope.e);
					//start date
					$scope.s_date=this.item(c_id).start_date.getDate();
					$scope.s_year=this.item(c_id).start_date.getFullYear();
					$scope.s_month=this.item(c_id).start_date.getMonth() + 1;
					$scope.start_date = $scope.s_year + "-" + $scope.s_month + "-" + $scope.s_date;

					//end date
					$scope.e_date=this.item(c_id).end_date.getDate();
					$scope.e_year=this.item(c_id).end_date.getFullYear();
					$scope.e_month=this.item(c_id).end_date.getMonth() + 1;
					$scope.end_date = $scope.e_year + "-" + $scope.e_month + "-" + $scope.e_date;

					//start time
					$scope.s_hour=this.item(c_id).start_date.getHours();
					$scope.s_minute=this.item(c_id).start_date.getMinutes();
					$scope.s_seconds=this.item(c_id).start_date.getSeconds();					
					$scope.start_time = $scope.s_hour + ":" + $scope.s_minute + ":" + $scope.s_seconds;

					//end time
					$scope.e_hour=this.item(c_id).end_date.getHours();
					$scope.e_minute=this.item(c_id).end_date.getMinutes();
					$scope.e_seconds=this.item(c_id).end_date.getSeconds();
					$scope.end_time = $scope.e_hour + ":" + $scope.e_minute + ":" + $scope.e_seconds;

					$scope.method = 'GET';
					$scope.url = 'http://schoolmanagementsoftwares.in/api/CalendarApi?';

					$http({method: $scope.method, url: $scope.url, params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, a:$rootScope.secret_key, id:$scope.e, StartDate:$scope.start_date, EndDate:$scope.end_date, StartTime:$scope.start_time, EndTime:$scope.end_time}})
						.success(function(data, status) {							
							console.log(data);
							console.log(status);
							$$("scheduler").refresh("scheduler");
						})
						.error(function(data, status) {
							console.log(data);
							console.log(status);
							alert("Request Failed");
						});
				}
				return true;
			});
			$$("scheduler").data.attachEvent("OnBeforeDelete",function(c_id){
				console.log(this.item(c_id).id);
				$scope.e=this.item(c_id).id;
				console.log($scope.e);
				$scope.method = 'GET';
				$scope.url = 'http://schoolmanagementsoftwares.in/api/CalendarApi?';

				$http({method: $scope.method, url: $scope.url, params: { X:$rootScope.sid, Y:$rootScope.y, Z:$rootScope.z, a:$rootScope.secret_key, id:$scope.e}})
					.success(function(data, status) {							
						console.log(data);
						console.log(status);
						$$("scheduler").refresh("scheduler");
					})
					. error(function(data, status) {
						alert("Request Failed");
						console.log(status);
					});
				return true;
			});
		});	  

	}]);