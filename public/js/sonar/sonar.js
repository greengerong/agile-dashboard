app.directive("sonar", ["proxy", "timer", "$timeout", function (proxy, timer, $timeout) {
    return {
        priority: 0,
        templateUrl: '/html/sonar/sonar.html',
        replace: false,
        transclude: false,
        restrict: 'EA',
        scope: true,
        controller: function ($scope) {

            var metricsKeyNames = [
                {"key": "ncloc", "name": "Lines of Code", "suffix": ""},
                {"key": "coverage", "name": "Coverage", "suffix": "%"},
                {"key": "line_coverage", "name": "Line Coverage", "suffix": "%"},
                {"key": "branch_coverage", "name": "Branch Coverage", "suffix": "%"},
                {"key": "violations_density", "name": "Rules Compliance", "suffix": "%"}
            ];

            var parseData = function (data) {
                $scope.metrics = [];
                for (var i in data.msr) {
                    $scope.metrics.push({'name': metricsKeyNames[i].name, 'percentage': data.msr[i].val + metricsKeyNames[i].suffix});
                }
                $scope.description = data.description;
            };

            var buildMetricsParameters = function () {
                var metricsParameters = '';
                for (var i in metricsKeyNames) {
                    metricsParameters += metricsKeyNames[i].key + ','
                }
                return metricsParameters.slice(0, metricsParameters.length - 1);
            };

            var sonarUrl = $scope.dashboardConfig.sonar.url;
            var resourceKey = $scope.dashboardConfig.sonar.resource;
            var sonarRequestUrl = sonarUrl + '?resource=' + resourceKey + '&metrics=' + buildMetricsParameters();

            var getSonarInfo = function () {
                proxy.get(sonarRequestUrl, function (data) {
                    $timeout(function () {
                        parseData(data[0])
                    });
                })
            };
            timer.start(getSonarInfo);
        }
    };
}]);
