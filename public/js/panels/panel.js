app.directive('panel', function() {
    return {
        priority: 900,
        templateUrl: '/html/panels/panel.html',
        replace: true,
        transclude: true,
        restrict: 'A',
        scope: true,
        controller: function($scope, $element, $attrs, $transclude) {
            console.log("in panel")
        }
    };
});