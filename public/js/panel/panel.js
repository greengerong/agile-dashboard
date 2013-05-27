app.directive('panel', function() {
    return {
        priority: 900,
        templateUrl: '/html/panel/panel.html',
        replace: true,
        transclude: true,
        restrict: 'A',
        scope: true,

        controller: ['$scope', '$element', 'calculateLayoutInRow',
            function($scope, $element, calculateLayoutInRow) {
                var allMonitors = $element.children();
                var widthDivision = calculateLayoutInRow(allMonitors.length);
                console.log("width division =", widthDivision)

                angular.forEach(allMonitors, function(monitor, index){
                    monitor = $(monitor);
                    monitor.addClass("span" + widthDivision[index]);
                });
        }]
    };
});