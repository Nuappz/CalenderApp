var phonecatServices = angular.module('phonecatServices', []);

phonecatServices.factory('mySharedService', [
  function($rootScope,$broadcast){
    var sharedService = {};

    sharedService.message = '';

    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
  }]);