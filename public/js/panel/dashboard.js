app.directive('dashboard', function() {
	return {
	    priority: 1000,
	    templateUrl: '/html/panel/dashboard.html',
	    replace: true,
	    transclude: true,
	    restrict: 'A',
	    scope: true,
	    controller: function($scope, $element, $attrs, $transclude) {
		}
	};
});