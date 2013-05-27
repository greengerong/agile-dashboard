app.directive("sonar", ["proxy", "timer", "$timeout", function (proxy, timer, $timeout) {
    return {
        priority:0,
        templateUrl:'/html/sonar/sonar.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        scope:true,
        controller:function ($scope) {
            var sonarUrl = $scope.dashboardConfig.sonar.url;
            var resourceKey = $scope.dashboardConfig.sonar.resource;


            var parseData = function (data) {
                $scope.metrics = [];
                for (var i in data.msr) {
                    $scope.metrics.push({'name':data.msr[i].key, 'percentage':data.msr[i].val + "%"});
                }
                console.log($scope.metrics);
                $scope.description = data.description;
            };

            var getSonarInfo = function () {
                proxy.get(sonarUrl + '?resource=' + resourceKey + '&metrics=coverage,line_coverage,branch_coverage', function (data) {
                    $timeout(function () {
                        parseData(data[0])
                    });
                })
            };
            timer.start(getSonarInfo);
        }
    };
}]);
