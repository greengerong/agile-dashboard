var app = app || angular.module('dashboardApp', []);

app.directive('sonar', ['proxy', function(){
	return {
		priority: 0,
		template: '/html/sonar/sonar.html',
		replace: true,
		transclude: false,
		restrict: 'A',
		scope: false,
		controller: function($scope, $element, $attrs, $transclude){

		},
		compile: function compile(tElement, tAttrs, transclude){
			return {
				pre: function preLink(scope, iElement, iAttrs, controller){},
				post: function postLink(scope, iElement, iAttrs, controller)	
			};
		},
		link: function postLink(scope, iElement, iAttrs){}
	};
}]);