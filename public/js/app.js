
var app = angular.module("dashboardApp",[])
	.factory("underscore",["$window",function($window){
		return $window._;
	}]).factory("proxy",["$http","$window",function($http,$window){
		return {
			get: function(url,success,error){
				$http.get($window.dashboardConfig.proxy + "?url=" + url).
				success(success).error(error);
			}
		};
	}]);
	
 function dashboardCtr($scope,$window){
 	$scope.dashboardConfig = $window.dashboardConfig;

 }
app.controller("dashboardCtr",["$scope","$window",dashboardCtr]);
