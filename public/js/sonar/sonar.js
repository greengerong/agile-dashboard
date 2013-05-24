app.directive("sonar", ["proxy", function(proxy){
	return {
		priority: 0,
		templateUrl: '/html/sonar/sonar.html',
		replace: true,
		transclude: false,
		restrict: 'AE',
		scope: false,
		controller: function($scope, $element, $attrs, $transclude){
			console.log("Hi, I am the controller.");
		}
		
	};
}]);