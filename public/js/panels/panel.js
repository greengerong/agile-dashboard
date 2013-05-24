app.directive('panel', function() {
    return {
        priority: 900,
        templateUrl: '/html/panels/panel.html',
        replace: true,
        transclude: true,
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $attrs, $transclude) {
            var allMonitors = $element.children();
            angular.forEach(allMonitors, function(monitor){
                $(monitor).addClass("span6");
            });
        }
    };
});