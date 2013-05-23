
var app = angular.module("dashboardApp",[])
	.factory("underscore",["$window",function($window){
		return $window._;
	}]);
	
 function dashboardCtr($scope){

 }
app.controller("dashboardCtr",dashboardCtr);
