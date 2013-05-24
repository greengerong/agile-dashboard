app.directive('sample', function() {
    return {
        priority: 0,
        template: '<div class="sample"></div>',
        replace: true,
        transclude: true,
        restrict: 'EA',
        scope: true,
        controller: function($scope, $element, $attrs, $transclude) {

        }
    };
});
