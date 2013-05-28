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
                {"key": "ncloc", "displayName": "Lines of Code"},
                {"key": "coverage", "displayName": "Coverage"},
                {"key": "line_coverage", "displayName": "Line Coverage"},
                {"key": "branch_coverage", "displayName": "Branch Coverage"},
                {"key": "violations_density", "displayName": "Rules Compliance"}
            ];

            var violationKeys = [{"key":"blocker_violations"},
                {"key":"critical_violations"},
                {"key":"violations"}];

            var parseMetricsData = function (data) {
                $scope.metrics = [];
                for (var i in data.msr) {
                    $scope.metrics.push({'name': metricsKeyNames[i].displayName, 'percentage': data.msr[i].frmt_val});
                }
                $scope.description = data.description;
            };

            var parseViolations = function(data){
                $scope.violations = [{"title":"Blocker", "value":data.msr[1].frmt_val},
                    {"title":"Critical", "value":data.msr[2].frmt_val},
                    {"title":"Total Violations", "value": data.msr[0].frmt_val}];

            };

            var buildParameters = function (data) {
                var parameters = '';
                for (var i in data) {
                    parameters += data[i].key + ','
                }
                return parameters.slice(0, parameters.length - 1);
            };

            var sonarBaseUrl = $scope.dashboardConfig.sonar.url;
            var resourceKey = $scope.dashboardConfig.sonar.resource;
            var sonarRequestUrlWithResource = sonarBaseUrl + '?resource=' + resourceKey;
            var sonarRequestUrlForMetrics = sonarRequestUrlWithResource + '&metrics=' + buildParameters(metricsKeyNames);
            var sonarRequestUrlForViolations = sonarRequestUrlWithResource + '&metrics=' + buildParameters(violationKeys);

            console.log(sonarRequestUrlForViolations);


            var getSonarInfo = function () {
                proxy.get(sonarRequestUrlForMetrics, function (data) {
                    $timeout(function () {
                        parseMetricsData(data[0]);
                    });
                });

                proxy.get(sonarRequestUrlForViolations, function(data){
                    $timeout(function () {
                        parseViolations(data[0]);
                    });
                });
            };
            timer.start(getSonarInfo);
        }
    };
}]);
